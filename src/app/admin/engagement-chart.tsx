
"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useProgress } from '@/hooks/use-progress';
import { getSubjects, getTotalQuestionsInSubject } from '@/lib/data';

export function EngagementChart() {
    const { getSubjectProgress, isLoaded } = useProgress();
    const subjects = getSubjects();

    const chartData = subjects.map(subject => {
        const completed = getSubjectProgress(subject);
        const total = getTotalQuestionsInSubject(subject);
        return {
            name: subject,
            completed,
            remaining: total > 0 ? total - completed : 0,
        };
    });

    if (!isLoaded) {
        return <div>Loading chart data...</div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip
                        contentStyle={{
                            background: "hsl(var(--background))",
                            borderColor: "hsl(var(--border))",
                        }}
                    />
                    <Legend />
                    <Bar dataKey="completed" stackId="a" fill="hsl(var(--primary))" name="Completed" />
                    <Bar dataKey="remaining" stackId="a" fill="hsl(var(--secondary))" name="Remaining" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
