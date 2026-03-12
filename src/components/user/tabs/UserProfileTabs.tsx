import { Calendar, GraduationCap } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentsTabContent from "./appointments/AppointmentsTabContent";
import EnrollmentsTabContent from "./enrollments/EnrollmentsTabContent";

const UserProfileTabs = () => {
  const { tab } = useParams();

  const navigate = useNavigate();

  const activeTab = tab || "appointments";

  const handleTabChange = (value: string) => {
    navigate(`/profile/${value}`);
  };

  return (
    <section className="mx-auto max-w-5xl px-6 pb-16">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="mt-10">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger
            value="appointments"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <Calendar className="mr-2 h-4 w-4" />
            Appointments
          </TabsTrigger>
          <TabsTrigger
            value="enrollments"
            className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
          >
            <GraduationCap className="mr-2 h-4 w-4" />
            Enrollments
          </TabsTrigger>
        </TabsList>

        {/* Appointments Tab */}
        <TabsContent value="appointments" className="mt-6">
          <AppointmentsTabContent />
        </TabsContent>

        {/* Enrollments Tab */}
        <TabsContent value="enrollments" className="mt-6">
          <EnrollmentsTabContent />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default UserProfileTabs;
