import React, { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/ExperienceBar.module.css';

const ExperienceBar: React.FC = () => {
  const { currenteExperience, experienceToNextLevel } = useContext(ChallengesContext);

const percentToNextLevel = Math.round(currenteExperience * 100) / experienceToNextLevel

  return (
    <header  className={styles.experienceBar}>
        <span>0 xp</span>
            <div>
                <div style={{ width: `${percentToNextLevel}%` }} />
                <span className={styles.currentExperience} style={{ left: `${percentToNextLevel}%` }}> 
                    {currenteExperience} xp 
                </span>
            </div>
        <span>{experienceToNextLevel} xp</span>
    </header>
  );
}

export default ExperienceBar;