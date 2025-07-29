"use client";

import { useState, useEffect, useCallback } from 'react';
import { data } from '@/lib/data';

const PROGRESS_KEY = 'waec-prepace-progress';

type ProgressData = { [questionId: string]: boolean };

const getQuestionUniqueId = (subject: string, year: string, questionId: number) => 
  `${subject}-${year}-${questionId}`;

export const useProgress = () => {
    const [progress, setProgress] = useState<ProgressData>({});
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedProgress = localStorage.getItem(PROGRESS_KEY);
            if (savedProgress) {
                setProgress(JSON.parse(savedProgress));
            }
        } catch (error) {
            console.error("Failed to load progress from localStorage", error);
        } finally {
            setIsLoaded(true);
        }
    }, []);

    const markAsCompleted = useCallback((subject: string, year: string, questionId: number) => {
        const uniqueId = getQuestionUniqueId(subject, year, questionId);
        setProgress(prev => {
            const newProgress = { ...prev, [uniqueId]: true };
            try {
                localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress));
            } catch (error) {
                console.error("Failed to save progress to localStorage", error);
            }
            return newProgress;
        });
    }, []);

    const getSubjectProgress = useCallback((subjectName: string) => {
        const subjectData = data[subjectName];
        if (!subjectData || !isLoaded) return 0;
        
        let completed = 0;
        Object.keys(subjectData).forEach(year => {
            const questions = subjectData[year];
            questions.forEach(q => {
                const uniqueId = getQuestionUniqueId(subjectName, year, q.id);
                if (progress[uniqueId]) {
                    completed++;
                }
            });
        });
        
        return completed;
    }, [progress, isLoaded]);

    const isCompleted = useCallback((subject: string, year: string, questionId: number) => {
        const uniqueId = getQuestionUniqueId(subject, year, questionId);
        return !!progress[uniqueId];
    }, [progress]);

    return { progress, isLoaded, markAsCompleted, getSubjectProgress, isCompleted };
};
