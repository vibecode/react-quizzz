import React, { PureComponent } from 'react'
import styles from './FormFeedback.module.scss'
import { CSSTransition } from 'react-transition-group'
import Textarea from 'react-textarea-autosize'
import SubmitButton from './SubmitButton'

export class FeedbackForm extends PureComponent {
  state = {
    answer: ''
  }

  componentDidMount() {
    if (this.props.focused) {
      this.input.focus()
    }
  }

  componentDidUpdate(prevProps) {
    const { focused } = this.props

    if (prevProps.focus !== focused) {
      focused ? this.input.focus() : this.input.blur()
    }
  }

  onInputChange = ev => {
    const { value } = ev.target

    this.setState({
      answer: value
    })
  }

  onSubmit = ev => {
    ev.preventDefault()

    const answer = this.state.answer.trim()

    this.props.submitAnswer({
      answer,
      answered: !!answer,
      id: this.props.id,
      parentId: this.props.parentId
    })
  }

  onEnterPress = ev => {
    if (ev.key === 'Enter' && !ev.shiftKey) {
      this.onSubmit(ev)
    }
  }

  onFocus = () => {
    this.props.onFocus(this.props.id)
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <Textarea
          className={styles.input}
          onChange={this.onInputChange}
          placeholder="Type your answer here..."
          inputRef={tag => (this.input = tag)}
          onKeyDown={this.onEnterPress}
          onFocus={this.onFocus}
        />
        <p className={styles.hint}>
          <strong>SHIFT</strong> + <strong>ENTER</strong> to make a line break
        </p>

        <CSSTransition
          in={!!this.state.answer}
          mountOnEnter
          unmountOnExit
          timeout={500}
          classNames="trans"
        >
          <SubmitButton />
        </CSSTransition>
      </form>
    )
  }
}

export default FeedbackForm
