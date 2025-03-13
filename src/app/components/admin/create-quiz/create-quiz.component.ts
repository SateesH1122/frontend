import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface Question {
  text: string;
  type: 'mcq' | 'truefalse';
  options: Option[];
  correctAnswer: string;
  difficulty: 'low' | 'medium' | 'high';
}

@Component({
  selector: 'app-create-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent {
  // showModal = true;
  quizTitle: string = 'Example Quiz';
  quizDescription: string = 'This Quiz is an example quiz';
  questions: Question[] = [];

  constructor(private router: Router, private http: HttpClient) { }

  // openModal() {
  //   this.showModal = true;
  // }

  // closeModal() {
  //   this.showModal = false;
  // }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  addQuestion() {
    this.questions.push({
      text: `Question ${this.questions.length + 1}`,
      type: 'mcq',
      options: [],
      correctAnswer: '',
      difficulty: 'low'
    });
  }

  // (change)="updateOptions(i) add this to the select tag in the html file
  updateOptions(index: number) {
    if (this.questions[index].type === 'truefalse') {
      this.questions[index].options = [
        { text: 'True', isCorrect: false },
        { text: 'False', isCorrect: false }
      ];
    } else {
      this.questions[index].options = [];
    }
  }

  addOption(questionIndex: number) {
    this.questions[questionIndex].options.push({ text: 'Option', isCorrect: false });
  }

  deleteOption(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].options.splice(optionIndex, 1);
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  setCorrectAnswer(questionIndex: number, optionIndex: number) {
    this.questions[questionIndex].correctAnswer = this.questions[questionIndex].options[optionIndex].text;
    this.questions[questionIndex].options.forEach((option, index) => {
      option.isCorrect = index === optionIndex;
    });
  }

  saveQuiz() {
    const quizDTO = {
      title: this.quizTitle,
      description: this.quizDescription,
      userID: 8, // Assuming a static user ID for now
      createdAt: new Date()
    };

    // Save the quiz
    this.http.post('https://localhost:44367/api/Quizzes', quizDTO).subscribe(
      (quizRes: any) => {
        console.log('Quiz Saved:', quizRes);

        // Save each question
        this.questions.forEach((question, index) => {
          const questionDTO = {
            quizID: quizRes.quizID,
            questionText: question.text,
            questionType: question.type,
            difficultyLevel: question.difficulty
          };

          this.http.post('https://localhost:44367/api/Questions', questionDTO).subscribe(
            (questionRes: any) => {
              console.log('Question Saved:', questionRes);

              // Save each option
              question.options.forEach((option, optionIndex) => {
                const optionDTO = {
                  questionID: questionRes.questionID,
                  optionText: option.text,
                  isCorrect: option.isCorrect
                };

                this.http.post('https://localhost:44367/api/Options', optionDTO).subscribe(
                  (optionRes: any) => {
                    console.log('Option Saved:', optionRes);
                  },
                  (optionError) => {
                    console.error('Error saving option', optionError);
                  }
                );
              });
            },
            (questionError) => {
              console.error('Error saving question', questionError);
            }
          );
        });

        this.navigateTo('dashboard')
      },
      (quizError) => {
        console.error('Error saving quiz', quizError);
      }
    );
  }
}