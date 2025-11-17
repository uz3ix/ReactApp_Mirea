function checkStatus(status){
    if (status == 'completed')
        return (
            <div className="status">
                <p className="completed">Изучение завершено</p>
            </div>
        )
    else if (status == 'in-progress')
        return (
            <div className="status">
                <p className="in-progress" >В процессе изучения</p>
            </div>
        )
    else
        return (
            <div className="status">
                <p className="not-started" >Еще не начат</p>
            </div>
        )
}

function TechnologyCard({technologies}) {

    return (
        <div className="task-list">
            <span className="title-task-list">Список задач</span>
            <ul className="list">
                {technologies.map(task => (
                    <li key={task.id} className={`list-item`}>
                        <span className="title-item">{task.title} </span>
                        <br />
                        <span className="description-item">{task.description}</span>
                        {checkStatus(task.status)}
                        
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TechnologyCard;