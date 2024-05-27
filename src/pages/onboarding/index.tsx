import React, { useState, useEffect } from 'react'
import styles from './onboarding.module.css'
import content from '../../../content/pages/onboarding/onboarding.json'

const Onboarding: React.FC = () => {
  const [stepIndices, setStepIndices] = useState<number[]>(() =>
    content.sections.map(() => 0)
  )

  useEffect(() => {
    const sections = document.querySelectorAll(`.${styles.section}`)
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(styles.active)
        } else {
          entry.target.classList.remove(styles.active)
        }
      })
    }, options)

    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const nextStep = (index: number) => {
    setStepIndices((prev) =>
      prev.map((step, i) => (i === index ? step + 1 : step))
    )
  }

  const prevStep = (index: number) => {
    setStepIndices((prev) =>
      prev.map((step, i) => (i === index ? step - 1 : step))
    )
  }

  return (
    <div className={styles.onboardingContainer}>
      {content.sections.map((section, index) => (
        <section
          key={index}
          className={`${styles.section} ${
            stepIndices[index] === 0 ? styles.active : ''
          }`}
        >
          <h1>{section.title}</h1>
          <p>{section.content}</p>
          {section.image && (
            <img
              src={section.image}
              alt={section.title}
              className={styles.image}
            />
          )}

          {section.steps && section.steps.length > 0 && (
            <div className={styles.bookContainer}>
              {section.steps[stepIndices[index]] && (
                <div className={styles.stepPage}>
                  <h2>{section.steps[stepIndices[index]].title}</h2>
                  <p>{section.steps[stepIndices[index]].content}</p>
                  {section.steps[stepIndices[index]].image && (
                    <img
                      src={section.steps[stepIndices[index]].image}
                      alt={section.steps[stepIndices[index]].title}
                      className={styles.stepImage}
                    />
                  )}
                  {stepIndices[index] > 0 && (
                    <button
                      onClick={() => prevStep(index)}
                      className={styles.prevButton}
                    >
                      Zurück
                    </button>
                  )}
                  {stepIndices[index] < section.steps.length - 1 && (
                    <button
                      onClick={() => nextStep(index)}
                      className={styles.nextButton}
                    >
                      Nächster Schritt
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </section>
      ))}
    </div>
  )
}

export default Onboarding
