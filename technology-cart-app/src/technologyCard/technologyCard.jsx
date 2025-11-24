import TechnologyNotes from "./TechnologyNotes";

function checkStatus(status){
    if (status === 'completed')
        return (
            <div className="status">
                <p className="completed">Изучение завершено</p>
            </div>
        )
    else if (status === 'in-progress')
        return (
            <div className="status">
                <p className="in-progress">В процессе изучения</p>
            </div>
        )
    else
        return (
            <div className="status">
                <p className="not-started">Еще не начат</p>
            </div>
        )
}

function TechnologyCard({ technologies, changeStatus , changeAllStatus, updateTechnologyNotes}) {
    return (
        <div className="task-list">
            <span className="title-task-list">Список задач</span>
            <div className="container-btn">
                <button 
                    className="btn-switch-to-ns" 
                    onClick={() => changeAllStatus('not-started')}
                >
                    Сбросить все статусы
                </button>
                <button
                    className="btn-switch-to-completed"
                    onClick={() => changeAllStatus('completed')}
                >
                    Выполнить все
                </button>
            </div>

            <ul className="list">
                {technologies.map(task => (
                    <li key={task.id} className={`list-item`}>
                        <span className="title-item">{task.title} </span>
                        <br />
                        <span className="description-item">{task.description}</span>
                        {checkStatus(task.status)}
                        <button 
                            className="btn-change-status" 
                            onClick={() => changeStatus(task.id)}
                        >
                            Изменить статус
                        </button>
                        <TechnologyNotes
                            notes={task.notes || ''}
                            onNotesChange={updateTechnologyNotes}
                            techId={task.id}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TechnologyCard;