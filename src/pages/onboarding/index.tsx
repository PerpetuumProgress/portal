import React, { useState } from 'react'
import styles from './onboarding.module.css'
import content from '../../../content/pages/onboarding/onboarding.json'

const Onboarding: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  return (
    <div className={styles.onboardingContainer}>
      {content.sections.map((section) => (
        <section key={section.id} className={styles.section}>
          <h1>{section.title}</h1>
          <p>{section.content}</p>
          {section.image && (
            <img
              src={section.image}
              alt={section.title}
              className={styles.image}
            />
          )}

          {section.id === 'setup-wallet' ? (
            <div className={styles.bookContainer}>
              {section.steps && section.steps[currentStep] && (
                <div className={styles.stepPage}>
                  <h2>{section.steps[currentStep].title}</h2>
                  <p>{section.steps[currentStep].content}</p>
                  {section.steps[currentStep].image && (
                    <img
                      src={section.steps[currentStep].image}
                      alt={section.steps[currentStep].title}
                      className={styles.stepImage}
                    />
                  )}
                  {currentStep > 0 && (
                    <button onClick={prevStep} className={styles.prevButton}>
                      Zurück
                    </button>
                  )}
                  {currentStep < section.steps.length - 1 && (
                    <button onClick={nextStep} className={styles.nextButton}>
                      Nächster Schritt
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div>
              {section.subsections &&
                section.subsections.map((subsection, index) => (
                  <div key={index} className={styles.subsection}>
                    <h2>{subsection.title}</h2>
                    <p>{subsection.content}</p>
                    {subsection.image && (
                      <img
                        src={subsection.image}
                        alt={subsection.title}
                        className={styles.image}
                      />
                    )}
                  </div>
                ))}
              {section.id === 'web-versions' && (
                <div className={styles.timelineContainer}>
                  <div className={styles.timelineLine}></div>
                  {section.timelineEvents.map((event, index) => (
                    <div key={index} className={styles.timelineEvent}>
                      <div className={styles.timelinePoint}></div>
                      <div className={styles.timelineEventContent}>
                        <h3>{event.date}</h3>
                        <p>{event.description}</p>
                      </div>
                    </div>
                  ))}
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
