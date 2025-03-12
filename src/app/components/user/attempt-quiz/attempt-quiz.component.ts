// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { HttpClient } from '@angular/common/http';

// interface Question {
//   correctAnswer: string;
//   text: string;
//   options: string[];
//   difficulty: 'low' | 'medium' | 'hard';
// }

// @Component({
//   selector: 'app-quiz-attempt',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './attempt-quiz.component.html',
//   styleUrls: ['./attempt-quiz.component.css']
// })
// export class QuizAttemptComponent implements OnInit {
//   quizId: string = '';
//   quizFound: boolean = false;
//   showQuizAttempt: boolean = false;
//   quizCompleted: boolean = false;
//   quizTitle: string = '';
//   questions: Question[] = [];
//   currentQuestionIndex: number = 0;
//   currentQuestion: Question = { text: '', options: [], difficulty: 'low', correctAnswer: '' };
//   userAnswers: { [key: number]: number } = {};
//   timeLeft: number = 0;
//   timer: any;
//   score: number = 0;
//   userID: number = 8; // Assuming a fixed user ID for this example
//   quizSearched: boolean = false;

//   constructor(private http: HttpClient) { }

//   ngOnInit(): void {
//     // Initial setup if needed
//     // this.fetchQuiz();
//   }

//   fetchQuiz() {
//     this.quizSearched = true;
//     this.http.get(`https://localhost:44367/api/QuizAttempts/WithOptions/${this.quizId}`).subscribe(
//       (res: any) => {
//         console.log('API Response:', res);
//         if (res && Object.keys(res).length > 0) {

//           this.quizTitle = 'Sample Quiz'; // You can set this based on the response if needed
//           this.questions = Object.values(res).map((question: any) => ({
//             text: question.questionText,
//             options: Object.values(question.options),
//             difficulty: 'low', // Set difficulty based on your criteria
//             correctAnswer: question.correctAnswer
//           }));
//           this.quizFound = true;
//         } else {
//           this.quizFound = false;
//         }
//       },
//       (error) => {
//         console.error('Error fetching quiz data', error);
//         this.quizFound = false;
//       }
//     );
//   }

//   startQuiz() {
//     this.showQuizAttempt = true;
//     this.currentQuestionIndex = 0;
//     this.currentQuestion = this.questions[this.currentQuestionIndex];
//     this.setTimer();
//   }

//   setTimer() {
//     if (this.currentQuestion.difficulty === 'low') {
//       this.timeLeft = 5;
//     } else if (this.currentQuestion.difficulty === 'medium') {
//       this.timeLeft = 20;
//     } else if (this.currentQuestion.difficulty === 'hard') {
//       this.timeLeft = 30;
//     }
//     this.timer = setInterval(() => {
//       this.timeLeft--;
//       if (this.timeLeft <= 0) {
//         clearInterval(this.timer);
//         this.nextQuestion();
//       }
//     }, 1000);
//   }

//   onNextClick() {
//     if (this.userAnswers[this.currentQuestionIndex]) {
//       this.nextQuestion();
//     } else {
//       // Display a message or handle the case where no option is selected
//       alert('Please select an option before proceeding to the next question.');
//     }
//   }

//   nextQuestion() {
//     if (this.userAnswers[this.currentQuestionIndex] || this.timeLeft <= 0) {
//       clearInterval(this.timer);
//       if (this.currentQuestionIndex < this.questions.length - 1) {
//         this.currentQuestionIndex++;
//         this.currentQuestion = this.questions[this.currentQuestionIndex];
//         this.setTimer();
//       } else {
//         this.submitQuiz();
//       }
//     }
//   }

//   submitQuiz() {
//     clearInterval(this.timer);
//     this.showQuizAttempt = false;
//     this.quizCompleted = true;
//     this.quizFound = false;

//     const submissionDTO = {
//       userID: this.userID,
//       quizID: parseInt(this.quizId),
//       answers: this.userAnswers
//     };

//     this.http.post('https://localhost:44367/api/QuizAttempts/Submit', submissionDTO).subscribe(
//       (res: any) => {
//         console.log('Quiz Submission Response:', res);
//         this.score = res.score;
//       },
//       (error) => {
//         console.error('Error submitting quiz', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

interface Question {
  correctAnswer: string;
  text: string;
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
  quizId: string = '';
  quizFound: boolean = false;
  showQuizAttempt: boolean = false;
  quizCompleted: boolean = false;
  quizTitle: string = '';
  quizDescription: string = '';
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  currentQuestion: Question = { text: '', options: [], difficulty: 'low', correctAnswer: '' };
  userAnswers: { [key: number]: number } = {};
  timeLeft: number = 0;
  timer: any;
  score: number = 0;
  userID: number = 8; // Assuming a fixed user ID for this example
  quizSearched: boolean = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // Initial setup if needed
    // this.fetchQuiz();
  }

  // fetchQuiz() {
  //   this.quizSearched = true;
  //   this.http.get(`https://localhost:44367/api/QuizAttempts/WithOptions/${this.quizId}`).subscribe(
  //     (res: any) => {
  //       console.log('API Response:', res);
  //       if (res && Object.keys(res).length > 0) {

  //         this.quizTitle = res.quizTitle;
  //         this.quizDescription = res.quizDescription;
  //         this.questions = Object.values(res).map((question: any) => ({
  //           text: question.questionText,
  //           options: Object.values(question.options),
  //           difficulty: question.difficultyLevel, // Set difficulty based on your criteria
  //           correctAnswer: question.correctAnswer
  //         }));
  //         this.quizFound = true;
  //       } else {
  //         this.quizFound = false;
  //       }
  //     },
  //     (error) => {
  //       console.error('Error fetching quiz data', error);
  //       this.quizFound = false;
  //     }
  //   );
  // }

  fetchQuiz() {
    this.quizSearched = true;
    this.http.get(`https://localhost:44367/api/QuizAttempts/WithOptions/${this.quizId}`).subscribe(
      (res: any) => {
        console.log('API Response:', res);
        if (res && res.length > 0) {
          const firstQuestion = res[0];
          this.quizTitle = firstQuestion.quizTitle;
          this.quizDescription = firstQuestion.quizDescription;
          this.questions = res.map((question: any) => ({
            text: question.questionText,
            options: Object.values(question.options),
            difficulty: question.difficultyLevel,
            correctAnswer: question.correctAnswer
          }));
          this.quizFound = true;
        } else {
          this.quizFound = false;
        }
      },
      (error) => {
        console.error('Error fetching quiz data', error);
        this.quizFound = false;
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
    if (this.currentQuestion.difficulty === 'low') {
      this.timeLeft = 5;
    } else if (this.currentQuestion.difficulty === 'medium') {
      this.timeLeft = 20;
    } else if (this.currentQuestion.difficulty === 'hard') {
      this.timeLeft = 30;
    }
    this.timer = setInterval(() => {
      this.timeLeft--;
      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.nextQuestion();
      }
    }, 1000);
  }

  onNextClick() {
    if (this.userAnswers[this.currentQuestionIndex]) {
      this.nextQuestion();
    } else {
      // Display a message or handle the case where no option is selected
      alert('Please select an option before proceeding to the next question.');
    }
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

    const submissionDTO = {
      userID: this.userID,
      quizID: parseInt(this.quizId),
      answers: this.userAnswers
    };

    this.http.post('https://localhost:44367/api/QuizAttempts/Submit', submissionDTO).subscribe(
      (res: any) => {
        console.log('Quiz Submission Response:', res);
        this.score = res.score;
      },
      (error) => {
        console.error('Error submitting quiz', error);
      }
    );
  }
}