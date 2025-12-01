import { useState, useEffect } from "react";

export default function useTechnologiesApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Имитация загрузки технологий из API
  const fetchTechnologies = async () => {
    try {
      setLoading(true);
      setError(null);

      await new Promise((res) => setTimeout(res, 700));
      return [
        {
          id: 101,
          title: "React",
          description: "UI-библиотека",
          category: "frontend",
          difficulty: "beginner",
          notes: "",
          status: "not-started"
        },
        {
          id: 102,
          title: "Node.js",
          description: "JavaScript на сервере",
          category: "backend",
          difficulty: "intermediate",
          notes: "",
          status: "not-started"
        }
      ];
    } catch (e) {
      setError("Ошибка загрузки технологий");
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Импорт карты по URL
  const importRoadmap = async (url) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url);
      if (!response.ok) throw new Error("Ошибка загрузки");

      return await response.json();
    } catch (e) {
      setError("Ошибка импорта дорожной карты");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, fetchTechnologies, importRoadmap };
}
