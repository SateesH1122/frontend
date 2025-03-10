import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 

interface Question {
  text: string;
  type: 'mcq' | 'truefalse';
  options: string[];
  correctAnswer: string;
}

@Component({
  selector: 'app-create-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent {
  showModal = true;
  quizTitle = '';
  quizDescription = '';
  questions: Question[] = [];

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addQuestion() {
    this.questions.push({
      text: '',
      type: 'mcq',
      options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
      correctAnswer: ''
    });
  }

  // updateOptions(index: number, options: string[]) {
  //   this.questions[index].options = options;
  // }

  updateOptions(index: number) {
    if (this.questions[index].type === 'truefalse') {
      this.questions[index].options = ['True', 'False'];
    } else {
      this.questions[index].options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    }
  }

  deleteQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  saveQuiz() {
    console.log('Quiz Saved:', {
      title: this.quizTitle,
      description: this.quizDescription,
      questions: this.questions
    });
    this.closeModal();
  }
}