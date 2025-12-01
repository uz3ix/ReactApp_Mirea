import { useState, useContext } from "react";
import useTechnologiesApi from "../hooks/useTechnologiesApi";
import { TechContext } from "../context/TechContext";

export default function RoadmapImporter() {
  const [url, setUrl] = useState("");
  const { importRoadmap, loading } = useTechnologiesApi();
  const { addTechnology } = useContext(TechContext);

  const handleImport = async () => {
    const roadmap = await importRoadmap(url);
    if (!roadmap) {
      alert("Не удалось загрузить карту");
      return;
    }

    if (!roadmap.technologies) {
      alert("API не содержит технологий");
      return;
    }

    roadmap.technologies.forEach((item) => {
      addTechnology({
        title: item.title,
        description: item.description || "",
        category: item.category || "other"
      });
    });

    alert("Импортировано: " + roadmap.technologies.length);
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Импорт дорожной карты</h3>

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Введите URL API"
        style={{ width: "100%", padding: 6, marginBottom: 10 }}
      />

      <button onClick={handleImport} disabled={loading}>
        {loading ? "Импорт..." : "Импортировать"}
      </button>
    </div>
  );
}
