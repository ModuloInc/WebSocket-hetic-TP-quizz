// ============================================================
// Leaderboard - Classement des joueurs
// A IMPLEMENTER : liste triee avec scores
// ============================================================

interface LeaderboardProps {
  /** Classement trie par score decroissant */
  rankings: { name: string; score: number }[]
}

/**
 * Composant affichant le classement des joueurs.
 *
 * Ce qu'il faut implementer :
 * - Un titre "Classement" (classe .leaderboard-title)
 * - Une liste ordonnee des joueurs (classe .leaderboard)
 * - Chaque joueur affiche (classe .leaderboard-item) :
 *   - Son rang (1, 2, 3...) dans .leaderboard-rank
 *   - Son nom dans .leaderboard-name
 *   - Son score dans .leaderboard-score
 * - Les 3 premiers ont des styles speciaux via :nth-child (deja dans le CSS)
 *
 * Note : les rankings sont deja tries par score decroissant
 */

const MEDALS = ['🥇', '🥈', '🥉']

function Leaderboard({ rankings }: LeaderboardProps) {
  return (
    <div className="phase-container">

      {/* TODO: Titre "Classement" avec .leaderboard-title */}
      <h1 className="leaderboard-title">🏆 Classement final</h1>

      <div className="leaderboard">
        {/* TODO: Pour chaque joueur dans rankings, afficher un .leaderboard-item */}
        {/* TODO: Afficher rang, nom et score */}
        {rankings.length === 0 ? (
          <p className="leaderboard-recap">Aucun joueur à afficher.</p>
        ) : (
          rankings.map((player, i) => (
            <div className="leaderboard-item" key={player.name}>
              {/* Rang — medaille pour le podium, chiffre sinon */}
              <span className="leaderboard-rank">
                {i < 3 ? MEDALS[i] : `${i + 1}`}
              </span>

              {/* Nom du joueur */}
              <span className="leaderboard-name">{player.name}</span>

              {/* Score */}
              <span className="leaderboard-score">
                {player.score.toLocaleString()} pts
              </span>
            </div>
          ))
        )}
      </div>

      {/* Recap sous le classement */}
      {rankings.length > 0 && (
        <p className="leaderboard-recap">
          {rankings.length} joueur{rankings.length > 1 ? 's' : ''} · Meilleur score :{' '}
          <span>{rankings[0].score.toLocaleString()} pts</span>
        </p>
      )}

    </div>
  )
}

export default Leaderboard