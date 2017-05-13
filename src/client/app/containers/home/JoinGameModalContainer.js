import { connect } from 'react-redux';
import JoinGameModalComponent from '../../components/home/JoinGameModalComponent';
import { updateSelectedGame } from '../../actions/lobby';

function mapStateToProps(state) {
	return {
		currentUser: state.user.currentUser,
		selectedGame: state.lobby.selectedGame,
		displayedGames: state.lobby.displayedGames
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateSelectedGame: game => dispatch(updateSelectedGame(game)),
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(JoinGameModalComponent);
