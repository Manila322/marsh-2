import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './TodoPage.module.css';

const TodoPage = () => {
	const { id } = useParams();
	const [task, setTask] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchTask = async () => {
			try {
				const response = await fetch(`http://localhost:3005/task/${id}`);
				const loadedTask = await response.json();
				setTask(loadedTask);
			} catch (error) {
				console.error('Ошибка загрузки задачи:', error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchTask();
	}, [id]);

	if (isLoading) return <div className={styles.loader}>Загрузка...</div>;
	if (!task) return <div>Задача не найдена.</div>;

	return (
		<div className={styles.todoPage}>
			<h2>{task.title}</h2>
			<p>Детали задачи...</p>
			<Link to="/">Назад к задачам</Link>
		</div>
	);
};

export default TodoPage;
