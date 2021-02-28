import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';

interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
    
}

interface ChallengesContextDataProps {
    level: number;
    levelUp: () => void;
     currenteExperience: number;
     experienceToNextLevel: number;
    challengesCompleted: number;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    activeChallenge: Challenge;
}
interface ChallengesProviderProps {
    children: ReactNode;
}

export const ChallengesContext = createContext({} as ChallengesContextDataProps);


export function ChallengesProvider({ children } : ChallengesProviderProps){
    const [level, setLevel] = useState(1);
    const [currenteExperience, setCurrenteExperience] = useState(20);
    const [challengesCompleted, setChallengesCompleted] = useState(0);
    const [activeChallenge, setActiveChallenge] = useState(null);


    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    function levelUp(){
      setLevel( level + 1)
    }

    function startNewChallenge() {
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
       const challenge = challenges[randomChallengeIndex];
       setActiveChallenge(challenge);
    }

    function resetChallenge() {
       setActiveChallenge(null);
    }
    
    return (
        <ChallengesContext.Provider 
            value={{
                level, 
                levelUp, 
                currenteExperience, 
                challengesCompleted, 
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel,
                }}>
            {children}
        </ChallengesContext.Provider>
    )
}