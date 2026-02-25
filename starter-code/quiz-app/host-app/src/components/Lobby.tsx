// ============================================================
// Lobby - Salle d'attente avant le quiz
// A IMPLEMENTER : affichage du code et liste des joueurs
// ============================================================

interface LobbyProps {
  /** Code du quiz a afficher pour que les joueurs rejoignent */
  quizCode: string
  /** Liste des noms de joueurs connectes */
  players: string[]
  /** Callback quand le host clique sur "Demarrer" */
  onStart: () => void
}

/**
 * Composant salle d'attente affiche cote host.
 *
 * Ce qu'il faut implementer :
 * - Le code du quiz affiche en grand (classe .quiz-code) avec le label "Code du quiz"
 * - Le nombre de joueurs connectes
 * - La liste des joueurs (puces avec classe .player-chip dans un .player-list)
 * - Un bouton "Demarrer le quiz" (classe .btn-start)
 *   desactive s'il n'y a aucun joueur
 *
 * Classes CSS disponibles : .phase-container, .quiz-code-label, .quiz-code,
 * .player-count, .player-list, .player-chip, .btn-start
 */
function Lobby({ quizCode, players, onStart }: LobbyProps) {
  return (
    <div className="phase-container">
      <h1>Salle d'attente</h1>

      {/* TODO: Label "Code du quiz" avec classe .quiz-code-label */}
      <p className="quiz-code-label">Code du quiz</p>

      {/* TODO: Afficher quizCode avec classe .quiz-code */}
      <div className="quiz-code">{quizCode}</div>

      {/* TODO: Afficher le nombre de joueurs */}
      <p className="player-count">
        {players.length === 0
          ? 'En attente des joueurs...'
          : `${players.length} joueur${players.length > 1 ? 's' : ''} connecté${players.length > 1 ? 's' : ''}`}
      </p>

      {/* TODO: Liste des joueurs avec .player-list et .player-chip */}
      {players.length > 0 && (
        <div className="player-list">
          {players.map(name => (
            <span key={name} className="player-chip">
              {name}
            </span>
          ))}
        </div>
      )}

      {/* TODO: Bouton Demarrer avec classe .btn-start, desactive si 0 joueurs */}
      <button
        className="btn-start"
        onClick={onStart}
        disabled={players.length === 0}
      >
        {players.length === 0 ? 'En attente de joueurs...' : 'Démarrer le quiz 🚀'}
      </button>
    </div>
  )
}

export default Lobby