import './ProgressHeader.css'
function createStatItem(name, value){
    return (
    <div className="stat-item">
        <span className="stat-label">{`${name}`} </span>
        <span className="stat-value">{value}</span>
    </div>
    )
}

function createProgressBar(percantages){
    return (
        <div className="progress-bar-container">
            <div className="progress-bar-text">
                <h2>Прогресс изучения:</h2>
            </div>
            <div className="progress-bar-out">
                <div className="progress-bar-fill" style={{width: `${percantages}%`}}></div>
            </div>
        </div>
    )
}

function ProgressHeader({technologies = []}){
    return (
        <div className="progress-header">
            <h2>Статистика</h2>
            <div className="stats-grid">
                {createStatItem("Всего технологий: ", technologies.length)}
                {createStatItem("Изучено: ", technologies.filter(t => t.status === "completed").length)}
                {createStatItem("В процессе: ", technologies.filter(t => t.status === "in-progress").length)}
                {createStatItem("Не начато: ", technologies.filter(t => t.status === "not-started").length)}
            </div>
            {createProgressBar(technologies.filter(t => t.status === "completed").length/technologies.length*100)}
        </div>
    )
}

export default ProgressHeader;