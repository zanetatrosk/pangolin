import { useState } from "react";
import { useStore } from "@tanstack/react-store";
import { authStore } from "@/stores/authStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Mail, Calendar, Edit, Save, X, Plus, Trash2, Video, Image as ImageIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getInitials } from "@/components/layout/utils/getInitials";

export function ProfilePage() {
  const { user } = useStore(authStore);
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  // Mock data initialization - in a real app, this would come from the backend/store
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "Maria",
    lastName: user?.lastName || "Gonzalez",
    description: "Passionate about Bachata Sensual and Traditional. Always looking for new dance partners to practice with!",
    role: "Follower",
    danceStyles: ["Bachata Sensual", "Bachata Dominicana", "Salsa On1"],
    media: [
      { type: "image", url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop" },
      { type: "image", url: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=400&h=300&fit=crop" }
    ]
  });

  const [newStyle, setNewStyle] = useState("");

  const upcomingEvents = [
    { id: 1, name: "Bachata Sensual Weekender", date: "2024-06-15", location: "Dance Studio 1" },
    { id: 2, name: "Summer Latin Festival", date: "2024-07-20", location: "City Park" },
  ];

  const pastEvents = [
    { id: 3, name: "Spring Salsa Gala", date: "2024-03-10", location: "Grand Hotel" },
  ];

  const handleSave = () => {
    // Implement save logic here
    setIsEditing(false);
  };

  const handleAddStyle = () => {
    if (newStyle && !profileData.danceStyles.includes(newStyle)) {
      setProfileData({ ...profileData, danceStyles: [...profileData.danceStyles, newStyle] });
      setNewStyle("");
    }
  };

  const handleRemoveStyle = (style: string) => {
    setProfileData({ ...profileData, danceStyles: profileData.danceStyles.filter(s => s !== style) });
  };

  return (
    <div className="container mx-auto max-w-4xl p-4 md:p-6 space-y-6">
      {/* Header / Main Profile Info */}
      <Card>
        <CardHeader className="relative">
          <div className="flex justify-end mb-4 md:absolute md:top-4 md:right-4 md:mb-0">
            {isEditing ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditing(false)}>
                  <X className="w-4 h-4 mr-2" />
                  {t("Cancel")}
                </Button>
                <Button size="sm" onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  {t("Save")}
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                {t("Edit Profile")}
              </Button>
            )}
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
              <AvatarImage src={user?.avatarUrl} alt={user?.username} />
              <AvatarFallback className="text-2xl">
                {getInitials(profileData.firstName, profileData.lastName)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center md:text-left space-y-2 flex-1 w-full">
              <div className="flex items-center justify-center md:justify-start gap-3">
                <h1 className="text-3xl font-bold">{user?.username || "username"}</h1>
                <Badge variant={profileData.role === "Leader" ? "default" : "secondary"} className="text-sm">
                  {profileData.role}
                </Badge>
              </div>
              
              {isEditing ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md w-full mx-auto md:mx-0">
                  <div className="space-y-1 text-left">
                    <Label htmlFor="firstName">{t("First Name")}</Label>
                    <Input 
                      id="firstName" 
                      value={profileData.firstName} 
                      onChange={(e) => setProfileData({...profileData, firstName: e.target.value})} 
                    />
                  </div>
                  <div className="space-y-1 text-left">
                    <Label htmlFor="lastName">{t("Last Name")}</Label>
                    <Input 
                      id="lastName" 
                      value={profileData.lastName} 
                      onChange={(e) => setProfileData({...profileData, lastName: e.target.value})} 
                    />
                  </div>
                </div>
              ) : (
                <h2 className="text-xl text-muted-foreground">
                  {profileData.firstName} {profileData.lastName}
                </h2>
              )}

              {isEditing ? (
                <div className="space-y-1 mt-2 text-left">
                  <Label htmlFor="description">{t("Description")}</Label>
                  <textarea
                    id="description"
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={profileData.description}
                    onChange={(e) => setProfileData({...profileData, description: e.target.value})}
                  />
                </div>
              ) : (
                <p className="text-muted-foreground max-w-lg">
                  {profileData.description}
                </p>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Dance Styles & Events */}
        <div className="md:col-span-1 space-y-6">
          {/* Dance Styles */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("Dance Styles")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {profileData.danceStyles.map((style) => (
                  <Badge key={style} variant="outline" className="pl-2 pr-1 py-1 flex items-center gap-1">
                    {style}
                    {isEditing && (
                      <X 
                        className="w-3 h-3 cursor-pointer hover:text-destructive" 
                        onClick={() => handleRemoveStyle(style)}
                      />
                    )}
                  </Badge>
                ))}
              </div>
              {isEditing && (
                <div className="flex gap-2">
                  <Input 
                    placeholder={t("Add style...")} 
                    value={newStyle}
                    onChange={(e) => setNewStyle(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddStyle()}
                  />
                  <Button size="icon" variant="ghost" onClick={handleAddStyle}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Events */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("Events")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {t("Upcoming")}
                </h3>
                <ul className="space-y-3">
                  {upcomingEvents.map(event => (
                    <li key={event.id} className="text-sm border-l-2 border-primary pl-3">
                      <p className="font-medium">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{event.date} • {event.location}</p>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-muted-foreground mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {t("Past")}
                </h3>
                <ul className="space-y-3">
                  {pastEvents.map(event => (
                    <li key={event.id} className="text-sm border-l-2 border-muted pl-3">
                      <p className="font-medium text-muted-foreground">{event.name}</p>
                      <p className="text-xs text-muted-foreground">{event.date}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Photos & Videos */}
        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{t("Photos & Videos")}</CardTitle>
              {isEditing && (
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" /> {t("Add Media")}
                </Button>
              )}
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {profileData.media.map((item, index) => (
                  <div key={index} className="relative group rounded-lg overflow-hidden border bg-muted aspect-video">
                    {item.type === 'image' ? (
                      <img src={item.url} alt="Dance media" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    {isEditing && (
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button size="icon" variant="destructive" className="h-8 w-8">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
                {profileData.media.length === 0 && (
                  <div className="col-span-full flex flex-col items-center justify-center py-12 text-muted-foreground border-2 border-dashed rounded-lg">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-50" />
                    <p>{t("No media added yet")}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
