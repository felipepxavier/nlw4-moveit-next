import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';

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
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
    activeChallenge: Challenge;
}
interface ChallengesProviderProps {
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;  
}

export const ChallengesContext = createContext({} as ChallengesContextDataProps);


export function ChallengesProvider({ 
    children, 
   ...rest
} : ChallengesProviderProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currenteExperience, setCurrenteExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currenteExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    }, [level, currenteExperience, challengesCompleted])



    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    useEffect(() => {
        Notification.requestPermission();
    },[])

    function levelUp(){
      setLevel( level + 1)
      setIsLevelUpModalOpen(true);
    }

    function startNewChallenge() {
       const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
       const challenge = challenges[randomChallengeIndex];
       setActiveChallenge(challenge);

       new Audio('/notification.mp3').play();

       if(Notification.permission === 'granted'){
           new Notification('Novo desafio', {
               body: `Valendo ${challenge.amount}xp!`
           }); 

       }
    }

    function resetChallenge() {
       setActiveChallenge(null);
    }

    function completeChallenge() {

        if(!activeChallenge){
          return  
        }

        const { amount } = activeChallenge;
        let finalExperience = currenteExperience + amount;

        if(finalExperience  >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrenteExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

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
                completeChallenge,
                closeLevelUpModal,
                }}>
            {children}
           { isLevelUpModalOpen &&  <LevelUpModal /> }
        </ChallengesContext.Provider>
    )
}