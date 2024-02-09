import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './index.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class MyTask extends Component {
  state = {
    userInput: '',
    selectTag: tagsList.length > 0 ? tagsList[0].optionId : '',
    tasks: [],
    filterTasks: [],
  }

  onChangeInput = event => {
    this.setState({userInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {userInput, selectTag} = this.state
    if (userInput !== '' && selectTag !== '') {
      this.setState(prevState => ({
        tasks: [
          ...prevState.tasks,
          {id: uuidv4(), task: userInput, displayText: selectTag},
        ],
        userInput: '',
        selectTag: tagsList.length > 0 ? tagsList[0].optionId : '',
      }))
    }
  }

  onChangeOption = event => {
    this.setState({selectTag: event.target.value})
  }

  onClickButton = displayText => {
    console.log(displayText)
    const {tasks} = this.state
    const filterTasks = tasks.filter(task => task.displayText === displayText)
    this.setState({filterTasks})
  }

  render() {
    const {userInput, selectTag, tasks, filterTasks} = this.state

    return (
      <div className="bg-container">
        <div className="task-container">
          <h1 className="task-heading">Create a task!</h1>
          <form onSubmit={this.onSubmitForm}>
            <div className="input-field-container">
              <label htmlFor="labelInput" className="label">
                Task
              </label>
              <input
                id="labelInput"
                type="text"
                className="input"
                placeholder="Enter the task here"
                onChange={this.onChangeInput}
                value={userInput}
              />
              <label className="label" htmlFor="labelTag">
                Tags
              </label>
              <select
                id="labelTag"
                className="select"
                onChange={this.onChangeOption}
                value={selectTag}
              >
                {tagsList.map(eachTag => (
                  <option key={eachTag.optionId} value={eachTag.optionId}>
                    {eachTag.displayText}
                  </option>
                ))}
              </select>
            </div>
            <div className="button-container">
              <button type="submit" className="button">
                Add Task
              </button>
            </div>
          </form>
        </div>
        <div className="tag-container">
          <h1 className="tag-name">Tags</h1>
          <div>
            <ul className="list-items">
              {tagsList.map(eachTag => (
                <li key={eachTag.optionId} className="list">
                  <button
                    type="button"
                    className="tag-button"
                    onClick={() => this.onClickButton(eachTag.displayText)}
                  >
                    {eachTag.displayText}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <h1 className="tag-name">Tasks</h1>
          <div>
            {tasks.length === 0 ? (
              <div className="no-task-container">
                <p className="no-task">No Tasks Added Yet</p>
              </div>
            ) : (
              tasks.map(task => (
                <div key={task.id} className="tasks-list-container">
                  <p className="heading">{task.task}</p>
                  <button type="button" className="tag-item-button">
                    {task.displayText}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default MyTask
