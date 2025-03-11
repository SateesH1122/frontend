import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Question {
  correctAnswer: string;
  text: string;
  type: 'mcq' | 'truefalse';
  options: string[];
  difficulty: 'low' | 'medium' | 'hard';
}

@Component({
  selector: 'app-quiz-attempt',
  imports: [CommonModule, FormsModule],
  templateUrl: './attempt-quiz.component.html',
  styleUrls: ['./attempt-quiz.component.css']
})
export class QuizAttemptComponent implements OnInit {
  quizId: string = '4';
  quizFound: boolean = false;
  showQuizAttempt: boolean = false;
  quizCompleted: boolean = false;
  quizTitle: string = '';
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: Question = { text: '', type: 'mcq', options: [], difficulty: 'low', correctAnswer: '' };
  userAnswers: string[] = [];
  timeLeft: number = 0;
  timer: any;
  canProceed: boolean = false;
  score: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchQuiz();
  }

  fetchQuiz() {
    this.http.get(`https://localhost:44367/api/QuizAttempts/WithOptions`).subscribe(
      (res: any) => {
        console.log('API Response:', res);
        if (res) {
          this.quizTitle = 'Sample Quiz'; // You can set this based on the response if needed
          this.questions = Object.values(res).map((question: any) => ({
            text: question.questionText,
            type: question.options.length === 2 && question.options.includes('True') && question.options.includes('False') ? 'truefalse' : 'mcq',
            options: Object.values(question.options),
            difficulty: 'low', // Set difficulty based on your criteria
            correctAnswer: question.correctAnswer
          }));
          this.quizFound = true;
        }
      },
      (error) => {
        console.error('Error fetching quiz data', error);
      }
    );
  }

  startQuiz() {
    this.showQuizAttempt = true;
    this.currentQuestionIndex = 0;
    this.currentQuestion = this.questions[this.currentQuestionIndex];
    this.setTimer();
  }

  setTimer() {
    this.canProceed = false;
    if (this.currentQuestion.difficulty === 'low') {
      this.timeLeft = 10;
    } else if (this.currentQuestion.difficulty === 'medium') {
      this.timeLeft = 20;
    } else if (this.currentQuestion.difficulty === 'hard') {
      this.timeLeft = 30;
    }
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.canProceed = true;
        this.nextQuestion();
      }
    }, 1000);
  }

  nextQuestion() {
    if (this.userAnswers[this.currentQuestionIndex] || this.timeLeft <= 0) {
      clearInterval(this.timer);
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        this.setTimer();
      } else {
        this.submitQuiz();
      }
    }
  }

  submitQuiz() {
    clearInterval(this.timer);
    this.showQuizAttempt = false;
    this.quizCompleted = true;
    this.quizFound = false;
    // Calculate score
    this.score = this.userAnswers.filter((answer, index) => answer === this.questions[index].correctAnswer).length;
  }
}