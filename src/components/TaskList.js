import React, { Component } from 'react';
import Task from './TaskItem';


class TaskList extends Component {
    render() {
        const taskItems = this.props.messages.map( message =>
            <Task task={message} key={message.id} />
        )
        return (
            <table className="tasks mdl-data-table mdl-js-data-table mdl-shadow--2dp">
                <thead>
                <tr>
                    <th className="task__done mdl-data-table__cell--non-numeric">Done?</th>              
                    <th className="task__desc mdl-data-table__cell--non-numeric">Task</th>
                    <th className="task__delete">Actions</th>              
                </tr>
                </thead>
                <tbody>
                    {taskItems}
                </tbody>
            </table>
        )
    }
};

export default TaskList;