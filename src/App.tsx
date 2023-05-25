import React, { useState, useCallback, useMemo } from "react";

const App: React.FC = () => {
  const [students, setStudents] = useState<any[]>([
    {
      id: "mahasiswa_1",
      name: "Mahasiswa 1",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_2",
      name: "Mahasiswa 2",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_3",
      name: "Mahasiswa 3",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_4",
      name: "Mahasiswa 4",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_5",
      name: "Mahasiswa 5",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_6",
      name: "Mahasiswa 6",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_7",
      name: "Mahasiswa 7",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_8",
      name: "Mahasiswa 8",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_9",
      name: "Mahasiswa 9",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
    {
      id: "mahasiswa_10",
      name: "Mahasiswa 10",
      aspect1: 1,
      aspect2: 1,
      aspect3: 1,
      aspect4: 1,
    },
  ]);

  const [showOutput, setShowOutput] = useState(false);

  const handleScoreChange = useCallback(
    (id: string, aspect: string, score: number) => {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === id ? { ...student, [aspect]: score } : student
        )
      );
      setShowOutput(false);
    },
    []
  );

  const handleSave = useCallback(() => {
    setShowOutput(true);
  }, []);

  const generateOutput = useMemo(() => {
    const output: Record<string, Record<string, number>> = {};

    students.forEach((student) => {
      for (let i = 1; i <= 4; i++) {
        const aspectKey = `aspek_penilaian_${i}`;
        output[aspectKey] = output[aspectKey] || {};
        output[aspectKey][student.id] = student[`aspect${i}`];
      }
    });

    return output;
  }, [students]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Aspek Penilaian 1</th>
            <th>Aspek Penilaian 2</th>
            <th>Aspek Penilaian 3</th>
            <th>Aspek Penilaian 4</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <StudentRow
              key={student.id}
              student={student}
              handleScoreChange={handleScoreChange}
            />
          ))}
        </tbody>
      </table>
      <button onClick={handleSave}>Simpan</button>
      {showOutput && (
        <>
          <h4>Ouput:</h4> <pre>{JSON.stringify(generateOutput, null, 2)}</pre>
        </>
      )}
    </div>
  );
};

interface StudentRowProps {
  student: any;
  handleScoreChange: (id: string, aspect: string, score: number) => void;
}

const StudentRow: React.FC<StudentRowProps> = React.memo(
  ({ student, handleScoreChange }) => (
    <tr>
      <td>{student.name}</td>
      <td>
        <ScoreSelect
          value={student.aspect1}
          onChange={(score: number) =>
            handleScoreChange(student.id, "aspect1", score)
          }
        />
      </td>
      <td>
        <ScoreSelect
          value={student.aspect2}
          onChange={(score: number) =>
            handleScoreChange(student.id, "aspect2", score)
          }
        />
      </td>
      <td>
        <ScoreSelect
          value={student.aspect3}
          onChange={(score: number) =>
            handleScoreChange(student.id, "aspect3", score)
          }
        />
      </td>
      <td>
        <ScoreSelect
          value={student.aspect4}
          onChange={(score: number) =>
            handleScoreChange(student.id, "aspect4", score)
          }
        />
      </td>
    </tr>
  )
);

interface ScoreSelectProps {
  value: number;
  onChange: (score: number) => void;
}

const ScoreSelect: React.FC<ScoreSelectProps> = ({ value, onChange }) => (
  <select value={value} onChange={(e) => onChange(parseInt(e.target.value))}>
    {Array.from({ length: 10 }, (_, index) => (
      <option key={index + 1} value={index + 1}>
        {index + 1}
      </option>
    ))}
  </select>
);

export default App;
