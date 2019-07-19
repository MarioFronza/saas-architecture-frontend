import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import ProjectsActions from '../../store/ducks/projects';
import MembersActions from '../../store/ducks/members';

import Button from '../../styles/components/Button';
import Modal from '../Modal';
import Members from '../Members';
import Can from '../Can';

import { Container, Project } from './styles';

class Projects extends Component {
  static propTypes = {
    getProjectsRequest: PropTypes.func.isRequired,
    openProjectModal: PropTypes.func.isRequired,
    closeProjectModal: PropTypes.func.isRequired,
    createProjectRequest: PropTypes.func.isRequired,
    openMembersModal: PropTypes.func.isRequired,
    activeTeam: PropTypes.shape({
      name: PropTypes.string,
    }),
    projects: PropTypes.shape({
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          title: PropTypes.string,
        }),
      ),
      projectModalOpen: PropTypes.bool,
    }).isRequired,
    members: PropTypes.shape({
      membersOpenModal: PropTypes.bool,
    }).isRequired,
  };

  static defaultProps = {
    activeTeam: null,
  };

  state = {
    newProject: '',
  };

  componentDidMount() {
    const { getProjectsRequest, activeTeam } = this.props;

    if (activeTeam) {
      getProjectsRequest();
    }
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleCreateProject = (e) => {
    e.preventDefault();
    const { newProject } = this.state;
    const { createProjectRequest } = this.props;

    createProjectRequest(newProject);
  };

  render() {
    const {
      activeTeam,
      projects,
      openProjectModal,
      closeProjectModal,
      openMembersModal,
      members,
    } = this.props;
    const { newProject } = this.state;
    if (!activeTeam) return null;

    return (
      <Container>
        <header>
          <h1>{activeTeam.name}</h1>

          <div>
            <Can checkPermission="projects_create">
              <Button onClick={openProjectModal}>+ Novo</Button>
            </Can>
            <Button onClick={openMembersModal}>Membro</Button>
          </div>
        </header>

        {projects.data.map(project => (
          <Project key={project.id}>
            <p>{project.title}</p>
          </Project>
        ))}

        {projects.projectModalOpen && (
          <Modal>
            <h1>Criar Projeto</h1>
            <form onSubmit={this.handleCreateProject}>
              <span>NOME</span>
              <input name="newProject" value={newProject} onChange={this.handleInputChange} />
              <Button size="big" type="submit">
                Salvar
              </Button>
              <Button size="small" color="gray" onClick={closeProjectModal}>
                Cancelar
              </Button>
            </form>
          </Modal>
        )}
        {members.membersOpenModal && <Members />}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  activeTeam: state.teams.active,
  members: state.members,
  projects: state.projects,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...ProjectsActions, ...MembersActions }, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Projects);
