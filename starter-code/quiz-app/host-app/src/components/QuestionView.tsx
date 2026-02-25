// ============================================================
// QuestionView - Affichage de la question en cours (cote host)
// A IMPLEMENTER : question, choix, timer, compteur de reponses
// ============================================================

import type { QuizQuestion } from '@shared/index'

interface QuestionViewProps {
  /** La question en cours (sans correctIndex) */
  question: Omit<QuizQuestion, 'correctIndex'>
  /** Index de la question (0-based) */
  index: number
  /** Nombre total de questions */
  total: number
  /** Temps restant en secondes */
  remaining: number
  /** Nombre de joueurs ayant repondu */
  answerCount: number
  /** Nombre total de joueurs */
  totalPlayers: number
}

/**
 * Composant affichant la question en cours sur l'ecran du host.
 *
 * Ce qu'il faut implementer :
 * - En-tete avec "Question X / Y" (classe .question-header)
 * - Le timer en cercle (classes .countdown, .countdown-circle)
 *   Ajouter la classe .warning si remaining <= 10, .danger si remaining <= 3
 * - Le texte de la question (classe .question-text)
 * - Les 4 choix dans une grille (classes .choices-grid, .choice-card)
 * - Le compteur de reponses "X / Y reponses" (classe .answer-counter)
 *
 * Note : cote host on affiche les choix mais sans interaction
 * (c'est purement visuel pour projeter au mur)
 */

// Couleurs et labels des choix Kahoot
const CHOICE_COLORS = ['#e21b3c', '#1368ce', '#d89e00', '#26890c']
const CHOICE_LABELS = ['A', 'B', 'C', 'D']

// Classes CSS des badges de couleur dans les barres de resultats
const CHOICE_LABEL_BADGE_CLASSES = [
  'choice-label-badge choice-label-badge--red',
  'choice-label-badge choice-label-badge--blue',
  'choice-label-badge choice-label-badge--yellow',
  'choice-label-badge choice-label-badge--green',
]

function QuestionView({ question, index, total, remaining, answerCount, totalPlayers }: QuestionViewProps) {
  // Classes CSS du timer selon le temps restant
  const timerClass = [
    'countdown-circle',
    remaining <= 3 ? 'danger' : remaining <= 10 ? 'warning' : '',
  ]
    .filter(Boolean)
    .join(' ')

  // Pourcentage de joueurs ayant repondu
  const progressPct = totalPlayers > 0
    ? Math.round((answerCount / totalPlayers) * 100)
    : 0

  return (
    <div className="phase-container">

      {/* TODO: En-tete "Question {index + 1} / {total}" */}
      <div className="question-header">
        <span>Question {index + 1} / {total}</span>
        <span>{answerCount} / {totalPlayers} réponses</span>
      </div>

      {/* TODO: Timer avec .countdown-circle (+ .warning / .danger selon remaining) */}
      <div className="countdown">
        <div className={timerClass}>{remaining}</div>
      </div>

      {/* TODO: Texte de la question avec .question-text */}
      <p className="question-text">{question.text}</p>

      {/* TODO: Grille des 4 choix avec .choices-grid et .choice-card */}
      {/* Note : cote host on affiche les choix mais sans interaction */}
      <div className="choices-grid">
        {question.choices.map((choice, i) => (
          <div
            key={i}
            className="choice-card"
            style={{ background: CHOICE_COLORS[i] }}
          >
            <span className={CHOICE_LABEL_BADGE_CLASSES[i]}>
              {CHOICE_LABELS[i]}
            </span>
            {choice}
          </div>
        ))}
      </div>

      {/* TODO: Compteur "{answerCount} / {totalPlayers} reponses" */}
      <div className="answer-counter">
        <div className="progress-bar-wrapper">
          <div
            className="progress-bar-fill"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="progress-bar-label">
          {totalPlayers > 0
            ? `${progressPct}% ont répondu`
            : 'En attente de réponses...'}
        </p>
      </div>

    </div>
  )
}

export default QuestionView