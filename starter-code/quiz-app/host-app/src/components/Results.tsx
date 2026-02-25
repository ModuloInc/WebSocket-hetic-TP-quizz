// ============================================================
// Results - Affichage des resultats d'une question
// A IMPLEMENTER : barres animees et bonne reponse
// ============================================================

import { useState, useEffect } from 'react'

interface ResultsProps {
  /** Index de la bonne reponse (0-3) */
  correctIndex: number
  /** Distribution des reponses [nb_choix_0, nb_choix_1, nb_choix_2, nb_choix_3] */
  distribution: number[]
  /** Texte des choix de reponse */
  choices: string[]
  /** Callback quand le host clique sur "Question suivante" */
  onNext: () => void
}

/**
 * Composant affichant les resultats d'une question avec des barres animees.
 *
 * Ce qu'il faut implementer :
 * - Un titre "Resultats"
 * - Pour chaque choix, une barre horizontale proportionnelle au nombre de reponses
 *   (classes .result-bar-container, .result-bar-label, .result-bar-wrapper, .result-bar)
 *   La barre correcte a la classe .correct, les autres .incorrect
 *   Afficher un label "(Bonne reponse)" a cote du bon choix (classe .correct-label)
 * - La largeur de la barre est proportionnelle :
 *   width = `${maxCount > 0 ? (count / maxCount) * 100 : 0}%`
 * - Un bouton "Question suivante" (classe .btn-primary)
 *
 * Astuce : const maxCount = Math.max(...distribution, 1)
 */

const CHOICE_LABELS = ['A', 'B', 'C', 'D']

// Classes CSS des badges de couleur dans les barres de resultats
const CHOICE_LABEL_BADGE_CLASSES = [
  'choice-label-badge choice-label-badge--red',
  'choice-label-badge choice-label-badge--blue',
  'choice-label-badge choice-label-badge--yellow',
  'choice-label-badge choice-label-badge--green',
]

function Results({ correctIndex, distribution, choices, onNext }: ResultsProps) {
  // On demarre les barres a 0 puis on les anime apres un court delai
  // Astuce : const maxCount = Math.max(...distribution, 1)
  const [widths, setWidths] = useState<number[]>([0, 0, 0, 0])

  const maxCount = Math.max(...distribution, 1)
  const totalAnswers = distribution.reduce((a, b) => a + b, 0)

  useEffect(() => {
    // Reset a 0 d'abord (si on change de question)
    setWidths([0, 0, 0, 0])

    // TODO: Apres un court setTimeout(50ms), mettre a jour le state avec les vrais pourcentages
    // La transition CSS fait le reste
    const timer = setTimeout(() => {
      setWidths(
        distribution.map(count => Math.round((count / maxCount) * 100))
      )
    }, 50)

    return () => clearTimeout(timer)
  }, [distribution])

  return (
    <div className="phase-container">
      <div className="results-container">

        {/* TODO: Un titre "Resultats" */}
        <h1>Résultats</h1>

        {/* Recap rapide */}
        <p className="results-recap">
          {totalAnswers} réponse{totalAnswers > 1 ? 's' : ''} reçue{totalAnswers > 1 ? 's' : ''}
          {' · '}
          Bonne réponse : <strong>{choices[correctIndex]}</strong>
        </p>

        {/* TODO: Pour chaque choix, afficher une barre de resultat */}
        {/* TODO: Utiliser .result-bar.correct pour la bonne reponse */}
        {/* TODO: Calculer la largeur proportionnelle de chaque barre */}
        {/* TODO: Afficher le nombre de reponses dans chaque barre */}
        {choices.map((choice, i) => {
          const isCorrect = i === correctIndex
          const count = distribution[i] ?? 0
          const pct = widths[i]

          return (
            <div className="result-bar-container" key={i}>
              {/* Label du choix */}
              <div className="result-bar-label">
                <span className={CHOICE_LABEL_BADGE_CLASSES[i]}>
                  {CHOICE_LABELS[i]}
                </span>
                {choice}
                {/* TODO: Afficher un label "(Bonne reponse)" avec .correct-label */}
                {isCorrect && (
                  <span className="correct-label"> ✓</span>
                )}
              </div>

              {/* Barre animee — width via style inline, transition CSS fait le reste */}
              <div className="result-bar-wrapper">
                <div
                  className={`result-bar ${isCorrect ? 'correct' : 'incorrect'}`}
                  style={{ width: `${pct}%` }}
                >
                  {pct > 15 && (
                    <span className="result-bar-count">{count}</span>
                  )}
                </div>
              </div>

              {/* Nombre de reponses a droite si barre trop petite */}
              {pct <= 15 && (
                <span className="result-bar-count-outside">{count}</span>
              )}
            </div>
          )
        })}

        {/* TODO: Bouton "Question suivante" */}
        <button className="btn-primary btn-next" onClick={onNext}>
          Question suivante →
        </button>

      </div>
    </div>
  )
}

export default Results