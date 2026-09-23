"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, Upload } from "lucide-react";

export default function DashboardClient({ initialData }: { initialData: any }) {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeTab, setActiveTab] = useState("general");
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/edit");
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage("Saving...");
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updatedData: data }),
      });
      const resData = await res.json();
      if (res.ok) {
        setMessage("Success: " + resData.message);
      } else {
        setMessage("Error: " + resData.error);
      }
    } catch (err: any) {
      setMessage("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, arrayName: string, index: number, folder: string, fieldName: string = "image") => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage(`Uploading image to ${folder}...`);

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      try {
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename: file.name, base64Data, folder }),
        });
        const resData = await res.json();
        if (res.ok) {
          setMessage("Image uploaded successfully!");
          const newArray = [...data[arrayName]];
          newArray[index] = { ...newArray[index], [fieldName]: resData.url };
          setData({ ...data, [arrayName]: newArray });
        } else {
          setMessage("Upload Error: " + resData.error);
        }
      } catch (err: any) {
        setMessage("Upload Error: " + err.message);
      } finally {
        setUploading(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const updateGeneral = (field: string, value: string) => setData({ ...data, [field]: value });

  const updateArrayItem = (arrayName: string, index: number, field: string, value: string) => {
    const newArray = [...data[arrayName]];
    newArray[index] = { ...newArray[index], [field]: value };
    setData({ ...data, [arrayName]: newArray });
  };

  const addProject = () => {
    setData({
      ...data,
      projects: [{ title: "New Project", href: "", dates: "2025", active: true, description: "New project description.", technologies: [], links: [], image: "", video: "" }, ...data.projects]
    });
  };

  const addGalleryItem = () => {
    setData({
      ...data,
      gallery: [{ title: "New Memory", src: "", category: "All" }, ...(data.gallery || [])]
    });
  };

  const addLabItem = () => {
    setData({
      ...data,
      lab: [{ title: "New Lab Item", description: "Experiment description", image: "" }, ...(data.lab || [])]
    });
  };

  const deleteArrayItem = (arrayName: string, index: number) => {
    const newArray = [...data[arrayName]];
    newArray.splice(index, 1);
    setData({ ...data, [arrayName]: newArray });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row">
      <div className="md:hidden flex items-center justify-between p-4 border-b border-border/50 bg-muted/10">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <aside className={`md:w-64 border-r border-border/50 bg-muted/10 p-6 flex flex-col gap-2 transition-all ${menuOpen ? "block" : "hidden md:flex"}`}>
        <h2 className="text-xl font-bold mb-6 hidden md:block">Admin Panel</h2>
        <button onClick={() => { setActiveTab("general"); setMenuOpen(false); }} className={`text-left px-4 py-2 rounded-lg ${activeTab === "general" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>General Info</button>
        <button onClick={() => { setActiveTab("projects"); setMenuOpen(false); }} className={`text-left px-4 py-2 rounded-lg ${activeTab === "projects" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>Projects</button>
        <button onClick={() => { setActiveTab("gallery"); setMenuOpen(false); }} className={`text-left px-4 py-2 rounded-lg ${activeTab === "gallery" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>Gallery</button>
        <button onClick={() => { setActiveTab("lab"); setMenuOpen(false); }} className={`text-left px-4 py-2 rounded-lg ${activeTab === "lab" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>Lab / Experiments</button>
        <button onClick={() => { setActiveTab("json"); setMenuOpen(false); }} className={`text-left px-4 py-2 rounded-lg ${activeTab === "json" ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}>Advanced (JSON)</button>
        <div className="mt-6 md:mt-auto">
          <Button variant="outline" onClick={handleLogout} className="w-full">Logout</Button>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <h1 className="text-3xl font-bold capitalize">{activeTab}</h1>
          <Button onClick={handleSave} disabled={loading}>{loading ? "Saving..." : "Save & Deploy"}</Button>
        </div>

        {message && <div className="mb-6 p-4 bg-muted border border-border rounded-lg font-mono text-sm break-all">{message}</div>}

        {activeTab === "general" && (
          <div className="flex flex-col gap-6 max-w-2xl">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <input className="bg-background border border-border rounded-md px-4 py-2" value={data.name} onChange={(e) => updateGeneral("name", e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Description</label>
              <input className="bg-background border border-border rounded-md px-4 py-2" value={data.description} onChange={(e) => updateGeneral("description", e.target.value)} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-muted-foreground">Summary</label>
              <textarea className="bg-background border border-border rounded-md px-4 py-2 h-48" value={data.summary} onChange={(e) => updateGeneral("summary", e.target.value)} />
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">Manage your portfolio projects.</p>
              <Button variant="secondary" onClick={addProject}>+ Add Project</Button>
            </div>
            {data.projects.map((proj: any, idx: number) => (
              <div key={idx} className="p-4 md:p-6 border border-border/50 rounded-xl bg-muted/5 flex flex-col gap-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-lg">Project #{idx + 1}</h3>
                  <Button variant="destructive" size="sm" onClick={() => deleteArrayItem("projects", idx)}>Delete</Button>
                </div>
                
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-xs text-muted-foreground">Title</label>
                    <input className="bg-background border border-border rounded-md px-3 py-1.5" value={proj.title} onChange={(e) => updateArrayItem("projects", idx, "title", e.target.value)} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-xs text-muted-foreground">Dates</label>
                    <input className="bg-background border border-border rounded-md px-3 py-1.5" value={proj.dates} onChange={(e) => updateArrayItem("projects", idx, "dates", e.target.value)} />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground">Image</label>
                  <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                    {proj.image ? (
                      <img src={proj.image} alt={proj.title} className="w-32 h-20 object-cover rounded-md border border-border/50 bg-black" />
                    ) : (
                      <div className="w-32 h-20 bg-muted/20 border border-border/50 rounded-md flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                    )}
                    <div className="flex flex-col gap-2 flex-1 w-full">
                      <input className="bg-background border border-border rounded-md px-3 py-1.5 w-full text-sm" value={proj.image} onChange={(e) => updateArrayItem("projects", idx, "image", e.target.value)} placeholder="/images/projects/your-image.png" />
                      <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 rounded-md text-xs font-semibold inline-flex items-center justify-center gap-2 w-fit">
                        <Upload size={14} /> Upload New
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleInlineImageUpload(e, "projects", idx, "projects", "image")} disabled={uploading} />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-muted-foreground">Description</label>
                  <textarea className="bg-background border border-border rounded-md px-3 py-1.5 h-24" value={proj.description} onChange={(e) => updateArrayItem("projects", idx, "description", e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "gallery" && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">Manage your masonry gallery items.</p>
              <Button variant="secondary" onClick={addGalleryItem}>+ Add Photo</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(data.gallery || []).map((item: any, idx: number) => (
                <div key={idx} className="p-4 border border-border/50 rounded-xl bg-muted/5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">Memory #{idx + 1}</h3>
                    <Button variant="destructive" size="sm" className="h-6 text-xs px-2" onClick={() => deleteArrayItem("gallery", idx)}>Delete</Button>
                  </div>
                  
                  {item.src ? (
                    <img src={item.src} className="w-full h-40 object-cover rounded-md border border-border/50 bg-black" />
                  ) : (
                    <div className="w-full h-40 bg-muted/20 border border-border/50 rounded-md flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                  )}

                  <div className="flex flex-col gap-2">
                    <input className="bg-background border border-border rounded-md px-2 py-1 text-xs" value={item.title} onChange={(e) => updateArrayItem("gallery", idx, "title", e.target.value)} placeholder="Title" />
                    <input className="bg-background border border-border rounded-md px-2 py-1 text-xs" value={item.src} onChange={(e) => updateArrayItem("gallery", idx, "src", e.target.value)} placeholder="Image URL" />
                    <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary px-2 py-1 rounded-md text-xs font-semibold flex items-center justify-center gap-2">
                      <Upload size={14} /> Upload Direct
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleInlineImageUpload(e, "gallery", idx, "gallery", "src")} disabled={uploading} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "lab" && (
          <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
              <p className="text-muted-foreground text-sm">Manage your experimental lab projects.</p>
              <Button variant="secondary" onClick={addLabItem}>+ Add Lab Item</Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(data.lab || []).map((item: any, idx: number) => (
                <div key={idx} className="p-4 border border-border/50 rounded-xl bg-muted/5 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-sm">Lab #{idx + 1}</h3>
                    <Button variant="destructive" size="sm" className="h-6 text-xs px-2" onClick={() => deleteArrayItem("lab", idx)}>Delete</Button>
                  </div>
                  
                  {item.image ? (
                    <img src={item.image} className="w-full h-40 object-cover rounded-md border border-border/50 bg-black" />
                  ) : (
                    <div className="w-full h-40 bg-muted/20 border border-border/50 rounded-md flex items-center justify-center text-xs text-muted-foreground">No Image</div>
                  )}

                  <div className="flex flex-col gap-2">
                    <input className="bg-background border border-border rounded-md px-2 py-1 text-xs" value={item.title} onChange={(e) => updateArrayItem("lab", idx, "title", e.target.value)} placeholder="Title" />
                    <input className="bg-background border border-border rounded-md px-2 py-1 text-xs" value={item.description} onChange={(e) => updateArrayItem("lab", idx, "description", e.target.value)} placeholder="Description" />
                    <input className="bg-background border border-border rounded-md px-2 py-1 text-xs" value={item.image} onChange={(e) => updateArrayItem("lab", idx, "image", e.target.value)} placeholder="Image URL" />
                    <label className="cursor-pointer bg-primary/10 hover:bg-primary/20 text-primary px-2 py-1 rounded-md text-xs font-semibold flex items-center justify-center gap-2">
                      <Upload size={14} /> Upload Direct
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleInlineImageUpload(e, "lab", idx, "lab", "image")} disabled={uploading} />
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "json" && (
          <div className="flex flex-col gap-2 h-full">
            <p className="text-sm text-muted-foreground">Edit the raw JSON data. Be careful with syntax.</p>
            <textarea
              className="w-full flex-1 min-h-[500px] bg-black text-green-400 font-mono p-4 md:p-6 text-sm rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary"
              value={JSON.stringify(data, null, 2)}
              onChange={(e) => {
                try {
                  setData(JSON.parse(e.target.value));
                } catch (err) {}
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
}
