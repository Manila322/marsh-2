import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import TodosListPage from './pages/TodosListPage';
import TodoPage from './pages/TodoPage';
import NotFound from './pages/NotFound';

export const App = () => {
	return (
		<Router>
			<div className={styles.app}>
				<Routes>
					<Route path="/" element={<TodosListPage />} />
					<Route path="/task/:id" element={<TodoPage />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</Router>
	);
};
