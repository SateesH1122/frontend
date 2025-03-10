import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Question {
  correctAnswer: string;
  text: string;
  type: 'mcq' | 'truefalse';
  options: string[];
  difficulty: 'low' | 'medium' | 'hard';
}

@Component({
  selector: 'app-quiz-attempt',
  imports: [CommonModule,FormsModule],
  templateUrl: './attempt-quiz.component.html',
  styleUrls: ['./attempt-quiz.component.css']
})
export class QuizAttemptComponent {
  quizId: string = '';
  quizFound: boolean = false;
  showQuizAttempt: boolean = false;
  quizCompleted: boolean = false;
  quizTitle: string = '';
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: Question = { text: '', type: 'mcq', options: [], difficulty: 'low' , correctAnswer: '' };
  userAnswers: string[] = [];
  timeLeft: number = 0;
  timer: any;
  canProceed: boolean = false;
  score: number = 0;

  fetchQuiz() {
    // Fetch quiz details based on quizId
    // Example data
    this.quizTitle = 'Sample Quiz';
    this.questions = [
      { text: 'Question 1', type: 'mcq', options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'], difficulty: 'low' , correctAnswer: 'Option 1' },
      { text: 'Question 2', type: 'truefalse', options: ['True', 'False'], difficulty: 'medium' , correctAnswer: 'True' },
    ];
    this.quizFound = true;
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

  // nextQuestion() {
  //   clearInterval(this.timer);
  //   if (this.userAnswers[this.currentQuestionIndex]) {
  //     this.canProceed = true;
  //   }
  //   if (this.currentQuestionIndex < this.questions.length - 1) {
  //     this.currentQuestionIndex++;
  //     this.currentQuestion = this.questions[this.currentQuestionIndex];
  //     this.setTimer();
  //   } else {
  //     this.submitQuiz();
  //   }
  // }

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