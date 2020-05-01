import React from "react";
import './Modal.css';

const API = 'https://quiz-spring-boot-app.herokuapp.com/questions/';

export default class Modal extends React.Component {
    constructor() {
        super()
        this.state = {
            jwt: localStorage.getItem("jwtToken"),
            questions: [],
    
            question: "",
    
            option_1: "",
            correct_1: false,
    
            option_2: "",
            correct_2: false,
    
            option_3: "",
            correct_3: false,
    
            option_4: "",
            correct_4: false,
    
            option_5: "",
            correct_5: false,
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCorrectAnswerChange = this.handleCorrectAnswerChange.bind(this);
      }
    handleChange(e){
		let target = e.target;
		let value = target.value;
    let name = target.name;
    console.log(value)

		this.setState({
			[name]: value
		});
  }

  handleCorrectAnswerChange(e){
    let target = e.target;
    let checked = target.checked;
    let name = target.name;
    console.log(checked)
 
		this.setState({
			[name]: checked
		});
  }

  handleSubmit(){
    if(this.state.question && this.state.option_1 && this.state.option_2 && this.state.option_3 && this.state.option_4 && this.state.option_5)
    this.postQuestion();
  }

  postQuestion = () => {
    console.log("question: " + this.state.question);
    console.log("option_1: " + this.state.option_1);
    console.log("correct_1: " + this.state.correct_1);

    fetch(API, {
      method: 'post',
      headers: {
        Accept: 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          questionContent: this.state.question,
          answers: [
            {
              answerContent: this.state.option_1,
              correct: this.state.correct_1,
            },
            {
              answerContent: this.state.option_2,
              correct: this.state.correct_2,
            },
            {
              answerContent: this.state.option_3,
              correct: this.state.correct_3,
            },
            {
              answerContent: this.state.option_4,
              correct: this.state.correct_4,
            },
            {
              answerContent: this.state.option_5,
              correct: this.state.correct_5,
            }
          ],
        },)
    })
      .then((res) => res.json())
      .then((res) => console.log(res))
      window.location.reload();

  }

  modalContent = () => {
      return(
        <div className="modal">
            <h1>Create your question</h1>
          <div className="modal-section">
            <form className="question-section" onClick={this.handleSubmit}>
                <input className="option" type="text" name="question" value={this.state.question} onChange={this.handleChange} placeholder="Question" required/>
                <input className="option" type="text" name="option_1" value={this.state.option_1} onChange={this.handleChange} placeholder="Option №1" required/>
                <input className="option" type="text" name="option_2" value={this.state.option_2} onChange={this.handleChange} placeholder="Option №2" required/>
                <input className="option" type="text" name="option_3" value={this.state.option_3} onChange={this.handleChange} placeholder="Option №3" required/>
                <input className="option" type="text" name="option_4" value={this.state.option_4} onChange={this.handleChange} placeholder="Option №4" required/>
                <input className="option" type="text" name="option_5" value={this.state.option_5} onChange={this.handleChange} placeholder="Option №5" required/>
                <input className="option" type="submit" value="Send" onClick={() => this.postQuestion}/>
            </form>
            <div className="checkbox-section">
                <input type="checkbox" name="correct_1" value={this.state.correct_1} onChange={this.handleCorrectAnswerChange}/>
                <input type="checkbox" name="correct_2" value={this.state.correct_1} onChange={this.handleCorrectAnswerChange}/>
                <input type="checkbox" name="correct_3" value={this.state.correct_1} onChange={this.handleCorrectAnswerChange}/>
                <input type="checkbox" name="correct_4" value={this.state.correct_1} onChange={this.handleCorrectAnswerChange}/>
                <input type="checkbox" name="correct_5" value={this.state.correct_1} onChange={this.handleCorrectAnswerChange}/>
            </div>
          </div>  
          <div>
            <div className="modal-close" 
              onClick={e => {
                this.onClose(e);
              }}
            >
              X
            </div>
          </div>
        </div>
      )
  }


    onClose = e => {
        this.props.onClose && this.props.onClose(e);
      };

    render() {
      if (!this.props.show) {
        return null;
      }
      return (
        <>
        {this.state.jwt ? this.modalContent() : ""}
        </>
      )
    }
}