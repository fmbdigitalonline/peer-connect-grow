import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import {
  Users,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  AlertTriangle,
  Calendar,
  MessageSquare,
  Download,
  Clock,
  Target,
} from "lucide-react";

interface Student {
  id: string;
  name: string;
  role: "supportee" | "buddy" | "leader";
  lastActive: Date;
  sessions30Days: number;
  reflectionsCompleted: number;
  engagementScore: number;
  status: "active" | "monitor" | "urgent";
}

interface Alert {
  id: string;
  studentId: string;
  studentName: string;
  type: "urgent" | "monitor" | "positive";
  category: "wellbeing" | "engagement" | "safety" | "milestone";
  message: string;
  createdAt: Date;
  addressed: boolean;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma van der Berg",
    role: "supportee",
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    sessions30Days: 8,
    reflectionsCompleted: 6,
    engagementScore: 85,
    status: "active",
  },
  {
    id: "2",
    name: "Mehmet Yilmaz",
    role: "buddy",
    lastActive: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    sessions30Days: 12,
    reflectionsCompleted: 10,
    engagementScore: 92,
    status: "active",
  },
  {
    id: "3",
    name: "Lisa Chen",
    role: "buddy",
    lastActive: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    sessions30Days: 3,
    reflectionsCompleted: 2,
    engagementScore: 45,
    status: "monitor",
  },
  {
    id: "4",
    name: "Ahmed Hassan",
    role: "supportee",
    lastActive: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    sessions30Days: 1,
    reflectionsCompleted: 0,
    engagementScore: 25,
    status: "urgent",
  },
  {
    id: "5",
    name: "Sophie Bakker",
    role: "leader",
    lastActive: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    sessions30Days: 15,
    reflectionsCompleted: 14,
    engagementScore: 95,
    status: "active",
  },
];

const mockAlerts: Alert[] = [
  {
    id: "1",
    studentId: "4",
    studentName: "Ahmed Hassan",
    type: "urgent",
    category: "engagement",
    message: "Geen activiteit in de afgelopen 7 dagen. Laatste sessie: 8 dagen geleden.",
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000),
    addressed: false,
  },
  {
    id: "2",
    studentId: "3",
    studentName: "Lisa Chen",
    type: "monitor",
    category: "engagement",
    message: "Engagement score gedaald van 75 naar 45 in de afgelopen 2 weken.",
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    addressed: false,
  },
  {
    id: "3",
    studentId: "5",
    studentName: "Sophie Bakker",
    type: "positive",
    category: "milestone",
    message: "Leader niveau bereikt! 15 sessies voltooid deze maand.",
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
    addressed: true,
  },
  {
    id: "4",
    studentId: "2",
    studentName: "Mehmet Yilmaz",
    type: "positive",
    category: "milestone",
    message: "Excellente peer feedback ontvangen van 3 supportees deze week.",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    addressed: false,
  },
];

const CoachDashboard = () => {
  const [students] = useState<Student[]>(mockStudents);
  const [alerts] = useState<Alert[]>(mockAlerts);

  const getStatusBadge = (status: Student["status"]) => {
    if (status === "active") {
      return (
        <Badge className="bg-peer-teal/10 text-peer-teal border-peer-teal/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Actief
        </Badge>
      );
    }
    if (status === "monitor") {
      return (
        <Badge className="bg-peer-orange/10 text-peer-orange border-peer-orange/20">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Monitor
        </Badge>
      );
    }
    return (
      <Badge className="bg-destructive/10 text-destructive border-destructive/20">
        <AlertCircle className="h-3 w-3 mr-1" />
        Urgent
      </Badge>
    );
  };

  const getAlertIcon = (type: Alert["type"]) => {
    if (type === "urgent") return <AlertCircle className="h-5 w-5 text-destructive" />;
    if (type === "monitor") return <AlertTriangle className="h-5 w-5 text-peer-orange" />;
    return <CheckCircle className="h-5 w-5 text-peer-teal" />;
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `${diffMins}m geleden`;
    if (diffHours < 24) return `${diffHours}u geleden`;
    return `${diffDays}d geleden`;
  };

  const urgentAlerts = alerts.filter((a) => a.type === "urgent" && !a.addressed);
  const totalSessions = students.reduce((sum, s) => sum + s.sessions30Days, 0);
  const avgEngagement = Math.round(
    students.reduce((sum, s) => sum + s.engagementScore, 0) / students.length
  );
  const activeStudents = students.filter((s) => s.status === "active").length;

  return (
    <div className="min-h-screen bg-gradient-soft pb-20">
      <Navigation />
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Coach Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Overzicht van je peers en activiteiten
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Metrics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-peer-teal/10">
                <Users className="h-5 w-5 text-peer-teal" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {students.length}
                </div>
                <div className="text-xs text-muted-foreground">Totaal Peers</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-peer-purple/10">
                <Calendar className="h-5 w-5 text-peer-purple" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{totalSessions}</div>
                <div className="text-xs text-muted-foreground">Sessies (30d)</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-peer-orange/10">
                <TrendingUp className="h-5 w-5 text-peer-orange" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">{avgEngagement}%</div>
                <div className="text-xs text-muted-foreground">Gem. Engagement</div>
              </div>
            </div>
          </Card>

          <Card className="p-4 bg-card border-border">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">
                  {urgentAlerts.length}
                </div>
                <div className="text-xs text-muted-foreground">Urgent Alerts</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Urgent Alerts */}
        {urgentAlerts.length > 0 && (
          <Card className="p-4 mb-6 bg-destructive/5 border-destructive/20">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">
                  {urgentAlerts.length} Urgente Alert{urgentAlerts.length !== 1 && "s"}
                </h3>
                <div className="space-y-2">
                  {urgentAlerts.map((alert) => (
                    <div key={alert.id} className="text-sm">
                      <span className="font-medium text-foreground">
                        {alert.studentName}:
                      </span>{" "}
                      <span className="text-muted-foreground">{alert.message}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Button size="sm" variant="destructive">
                Bekijk Alles
              </Button>
            </div>
          </Card>
        )}

        <Tabs defaultValue="students" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="students">Studenten ({students.length})</TabsTrigger>
            <TabsTrigger value="alerts">
              Alerts ({alerts.filter((a) => !a.addressed).length})
            </TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="mt-6">
            <div className="space-y-3">
              {students.map((student) => (
                <Card
                  key={student.id}
                  className="p-4 hover:shadow-md transition-all cursor-pointer bg-card border-border"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-peer flex items-center justify-center text-white font-semibold">
                      {student.name.split(" ").map((n) => n[0]).join("")}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{student.name}</h3>
                        {getStatusBadge(student.status)}
                        <Badge variant="outline" className="text-xs">
                          {student.role === "supportee" && "Supportee"}
                          {student.role === "buddy" && "Buddy"}
                          {student.role === "leader" && "Leader"}
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {formatTimeAgo(student.lastActive)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {student.sessions30Days} sessies
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageSquare className="h-3 w-3" />
                          {student.reflectionsCompleted} reflecties
                        </div>
                        <div className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {student.engagementScore}% engagement
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" size="sm">
                      Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Alerts Tab */}
          <TabsContent value="alerts" className="mt-6">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <Card
                  key={alert.id}
                  className={`p-4 bg-card border-border ${
                    alert.addressed ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {getAlertIcon(alert.type)}

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">
                          {alert.studentName}
                        </h3>
                        <Badge variant="outline" className="text-xs">
                          {alert.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground ml-auto">
                          {formatTimeAgo(alert.createdAt)}
                        </span>
                      </div>

                      <p className="text-sm text-muted-foreground mb-3">
                        {alert.message}
                      </p>

                      {!alert.addressed && (
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-3 w-3 mr-1" />
                            Bericht
                          </Button>
                          <Button size="sm" variant="outline">
                            Markeer als Afgehandeld
                          </Button>
                        </div>
                      )}

                      {alert.addressed && (
                        <Badge variant="secondary" className="text-xs">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Afgehandeld
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CoachDashboard;
