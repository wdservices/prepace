
import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Sigma, Users, Activity, PlusCircle } from "lucide-react";
import { getSubjects, getTotalQuestionsInSubject } from "@/lib/data";
import { EngagementChart } from "./engagement-chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminDashboard() {
  const subjects = getSubjects();
  const totalSubjects = subjects.length;
  const totalQuestions = subjects.reduce((acc, subject) => acc + getTotalQuestionsInSubject(subject), 0);

  const recentActivity = [
    { user: "Student A", activity: "Completed Chemistry 2023", time: "2 hours ago" },
    { user: "Student B", activity: "Started Physics 2023", time: "5 hours ago" },
    { user: "Student C", activity: "Completed Mathematics 2023", time: "1 day ago" },
    { user: "Student D", activity: "Asked a question in Biology", time: "2 days ago" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <Button asChild>
                <Link href="/admin/add-content">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Content
                </Link>
            </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,254</div>
              <p className="text-xs text-muted-foreground">+50 since last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">342</div>
              <p className="text-xs text-muted-foreground">+20% this week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Subjects</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalSubjects}</div>
              <p className="text-xs text-muted-foreground">Across all curricula</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Questions</CardTitle>
              <Sigma className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalQuestions}</div>
              <p className="text-xs text-muted-foreground">Available in the database</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Subject Engagement</CardTitle>
                    <CardDescription>
                        Completion progress per subject based on current user session.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <EngagementChart />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Placeholder feed of recent student activities.</CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Activity</TableHead>
                        <TableHead className="text-right">Time</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentActivity.map((activity, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">{activity.user}</TableCell>
                            <TableCell>{activity.activity}</TableCell>
                            <TableCell className="text-right text-muted-foreground">{activity.time}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </div>

      </main>
    </div>
  );
}
