import React, { Component } from 'react';
import { FaGithubAlt, FaPlus, FaSpinner, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import api from '../../services/api';

import Container from '../../componentes/Container';
import { Form, SubmitButton, List, ErrorMessage, EmptyList } from './styles';

export default class Main extends Component {
    state = {
        newRepo: '',
        repositories: [],
        loading: false,
        error: { status: false, message: '' },
    };

    // carregar os dados do localstorage
    componentDidMount() {
        const storage = localStorage.getItem('repositories');

        // caso já tenha algo salvo no localstorage, coloca no state
        if (storage) {
            this.setState({ repositories: JSON.parse(storage) });
        }
    }

    // salvar os dados do localstorage
    componentDidUpdate(_, prevState) {
        const { repositories } = this.state;

        // caso nessa mudança de estado o repositories mude, alterar o LS
        if (prevState.repositories !== repositories) {
            localStorage.setItem('repositories', JSON.stringify(repositories));
        }
    }

    addRepositories = () => {
        this.setState({
            repositories: [
                { name: 'facebook/react' },
                { name: 'facebook/react-native' },
                { name: 'nodejs/node' },
                { name: 'vuejs/vue' },
                { name: 'angular/angular' },
                { name: 'ant-design/ant-design' },
            ],
        });
    };

    handleInputChange = e => {
        this.setState({ newRepo: e.target.value });
    };

    handleRepoRemove = currentRepo => {
        const { repositories } = this.state;

        this.setState({
            repositories: repositories.filter(
                repository => repository.name !== currentRepo
            ),
        });
    };

    handleSubmit = async e => {
        e.preventDefault();

        this.setState({ loading: true });

        try {
            const { newRepo, repositories } = this.state;

            if (newRepo === '')
                throw new Error('Try searching for a valid repository');

            const repoExists = repositories.find(
                repository => repository.name === newRepo.trim()
            );

            if (repoExists)
                throw new Error('This repository was already saved');

            const response = await api.get(`/repos/${newRepo}`);

            const data = { name: response.data.full_name };

            this.setState({
                repositories: [...repositories, data],
                newRepo: '',
                error: { status: false, message: '' },
            });
        } catch (err) {
            let currentError;

            if (err.response && err.response.status === 404) {
                currentError = 'This repository does not exists';
            } else {
                [, currentError] = err.toString().split(': ');
            }

            this.setState({
                error: { status: true, message: currentError },
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const { newRepo, loading, repositories, error } = this.state;

        return (
            <Container>
                <h1>
                    <FaGithubAlt />
                    Repositories
                </h1>
                {/* quando criar um styled component? quando este tiver mais de
                dois níveis de encadeamento, assim isolando do resto da app */}
                <Form onSubmit={this.handleSubmit} error={error.status}>
                    <input
                        type="text"
                        placeholder="Add repository"
                        value={newRepo}
                        onChange={this.handleInputChange}
                    />
                    <SubmitButton loading={loading ? 1 : 0}>
                        {loading ? (
                            <FaSpinner color="#FFF" size={14} />
                        ) : (
                            <FaPlus color="#FFF" size={14} />
                        )}
                    </SubmitButton>
                </Form>

                <ErrorMessage>{error.message}</ErrorMessage>

                {repositories.length > 0 ? (
                    <List>
                        {repositories.map(repository => (
                            <li key={repository.name}>
                                <div>
                                    <FaTimes
                                        onClick={() =>
                                            this.handleRepoRemove(
                                                repository.name
                                            )
                                        }
                                    />
                                    <span>{repository.name}</span>
                                </div>
                                <Link
                                    to={`/repository/${encodeURIComponent(
                                        repository.name
                                    )}`}
                                >
                                    Details
                                </Link>
                            </li>
                        ))}
                    </List>
                ) : (
                    <EmptyList>
                        You haven&apos;t saved any repositories yet. Try
                        searching above or&nbsp;
                        <button onClick={this.addRepositories} type="button">
                            clicking here
                        </button>
                        &nbsp;to add some :)
                    </EmptyList>
                )}
            </Container>
        );
    }
}
