import React, { Component } from 'react';
import { FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../componentes/Container';
import {
    Loading,
    Owner,
    IssueList,
    ButtonGroup,
    IssueType,
    LoadingIssueList,
    Pagination,
} from './styles';

export default class Repository extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.shape({
                repository: PropTypes.string,
            }),
        }).isRequired,
    };

    state = {
        repository: {},
        issues: [],
        issueValues: [{ value: 'all' }, { value: 'open' }, { value: 'closed' }],
        loading: true,
        loadingIssueList: null,
        page: 1,
        showingIssues: 'all',
    };

    componentDidMount = async () => {
        const { match } = this.props;
        const { showingIssues } = this.state;

        const repoName = decodeURIComponent(match.params.repository);

        // faz as duas requisições ao mesmo tempo, em vez de aguardar que ambas
        // aconteçam isoladamente; então com desestruturação pega cada uma em
        // uma variavel, já que vem em formato de array
        const [repository, issues] = await Promise.all([
            api.get(`/repos/${repoName}`),
            api.get(`/repos/${repoName}/issues`, {
                // query params, viriam com / em frente, mas axios deixa passar
                // essa propriedade:
                params: {
                    state: showingIssues,
                    per_page: 5,
                },
            }),
        ]);

        this.setState({
            repository: repository.data,
            issues: issues.data,
            loading: false,
        });
    };

    handleIssueList = async e => {
        await this.setState({
            showingIssues: e.target.value,
            loadingIssueList: true,
            page: 1,
        });

        this.fetchIssues();
    };

    handlePagination = async e => {
        const { page } = this.state;

        await this.setState({
            page: e.target.value === 'previous' ? page - 1 : page + 1,
            loadingIssueList: true,
        });

        this.fetchIssues();
    };

    fetchIssues = async () => {
        const { showingIssues, repository, page } = this.state;

        const repoName = repository.full_name;

        const issues = await api.get(`/repos/${repoName}/issues?page=${page}`, {
            params: {
                state: showingIssues,
                per_page: 5,
            },
        });

        this.setState({
            issues: issues.data,
            loadingIssueList: false,
        });
    };

    render() {
        const {
            repository,
            issues,
            issueValues,
            loading,
            loadingIssueList,
            page,
            showingIssues,
        } = this.state;

        if (loading) {
            return (
                <Loading>
                    <FaSpinner size={75} />
                </Loading>
            );
        }

        return (
            <Container>
                <Owner>
                    <Link to="/">
                        <div>
                            <FaArrowLeft /> Back to previous page
                        </div>
                    </Link>
                    <img
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <h1>{repository.name}</h1>
                    <p>{repository.description}</p>
                </Owner>

                <ButtonGroup>
                    {issueValues.map(issueValue => (
                        <IssueType
                            key={issueValue.value}
                            onClick={this.handleIssueList}
                            value={issueValue.value}
                            type="button"
                            active={showingIssues === issueValue.value ? 1 : 0}
                        >
                            {issueValue.value}
                        </IssueType>
                    ))}
                </ButtonGroup>

                {loadingIssueList ? (
                    <LoadingIssueList>
                        <FaSpinner size={40} />
                    </LoadingIssueList>
                ) : (
                    <IssueList>
                        {issues.map(issue => (
                            // é bom colocar string como key
                            <li key={String(issue.id)}>
                                <img
                                    src={issue.user.avatar_url}
                                    alt={issue.user.login}
                                />
                                <div>
                                    <strong>
                                        <a href={issue.html_url}>
                                            {issue.title}
                                        </a>
                                        {issue.labels.map(label => (
                                            <span key={String(label.id)}>
                                                {label.name}
                                            </span>
                                        ))}
                                    </strong>
                                    <p>{issue.user.login}</p>
                                </div>
                            </li>
                        ))}
                        <Pagination>
                            <button
                                value="previous"
                                type="button"
                                onClick={this.handlePagination}
                                disabled={page === 1 ? 1 : 0}
                            >
                                Previous
                            </button>
                            <span> Page {page}</span>
                            <button
                                value="next"
                                type="button"
                                onClick={this.handlePagination}
                            >
                                Next
                            </button>
                        </Pagination>
                    </IssueList>
                )}
            </Container>
        );
    }
}
