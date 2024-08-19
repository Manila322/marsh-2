import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './TodosListPage.module.css';

const TodosListPage = () => {
	const [taskList, setTaskList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [task, setTask] = useState('');
	const [searchPhrase, setSearchPhrase] = useState('');
	const [sortAlphabetically, setSortAlphabetically] = useState(false);

	useEffect(() => {
		const fetchTasks = async () => {
			setIsLoading(true);
			try {
				const response = await fetch('http://localhost:3005/task');
				const loadedTask = await response.json();
				setTaskList(loadedTask);
			} catch (error) {
				console.error('Ошибка загрузки задач:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchTasks();
	}, []);

	const requestAddTask = async () => {
		try {
			const response = await fetch('http://localhost:3005/task', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({ title: task }),
			});
			const newTask = await response.json();
			setTaskList((prevList) => [...prevList, newTask]);
			setTask('');
		} catch (error) {
			console.error('Ошибка добавления задачи:', error);
		}
	};

	const requestDeleteTask = async (id) => {
		try {
			await fetch(`http://localhost:3005/task/${id}`, { method: 'DELETE' });
			setTaskList((prevList) => prevList.filter((task) => task.id !== id));
		} catch (error) {
			console.error('Ошибка удаления задачи:', error);
		}
	};

	const filteredTasks = taskList.filter((task) =>
		task.title.toLowerCase().includes(searchPhrase.toLowerCase()),
	);

	const sortedTasks = sortAlphabetically
		? [...filteredTasks].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTasks;

	const handleSortTasks = () => {
		setSortAlphabetically((prev) => !prev);
	};

	return (
		<div className={styles.todosListPage}>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					requestAddTask();
				}}
			>
				<input
					name="task"
					type="text"
					placeholder="Введите новую задачу"
					value={task}
					onChange={(e) => setTask(e.target.value)}
				/>
				<button type="submit">Добавить новую задачу</button>
			</form>
			<button onClick={handleSortTasks}>
				{sortAlphabetically ? 'Сбросить сортировку' : 'Сортировать по алфавиту'}
			</button>
			<input
				type="text"
				placeholder="Поиск по задачам"
				value={searchPhrase}
				onChange={(e) => setSearchPhrase(e.target.value)}
			/>
			<ul className="taskList">
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					sortedTasks.map(({ id, title }) => (
						<li key={id}>
							<Link to={`/task/${id}`}>
								<span title={title}>
									{title.length > 20
										? `${title.substring(0, 20)}...`
										: title}
								</span>
							</Link>
							<button onClick={() => requestDeleteTask(id)}>Удалить</button>
						</li>
					))
				)}
			</ul>
		</div>
	);
};

export default TodosListPage;
