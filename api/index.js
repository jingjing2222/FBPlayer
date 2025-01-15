// index.js
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = 3001;

// --- Swagger 설정 ---
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Players API",
            version: "1.0.0",
            description:
                "Node.js + Express + after.json을 이용한 선수 정보 관리 API",
        },
        servers: [
            {
                url: "http://localhost:3001",
                description: "Local server",
            },
        ],
    },
    apis: [path.join(__dirname, "index.js")],
};
const swaggerSpecs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// --- 미들웨어 ---
app.use(cors());
app.use(helmet());
app.use(morgan("combined"));
app.use(express.json()); // Request Body를 JSON으로 파싱

// after.json 파일 경로
const dataFilePath = path.join(__dirname, "after.json");

/**
 * after.json 데이터를 로드하는 함수
 */
function loadData() {
    try {
        const data = fs.readFileSync(dataFilePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        console.error("Error loading data:", err);
        return [];
    }
}

/**
 * after.json 데이터를 저장하는 함수
 */
function saveData(data) {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("Error saving data:", err);
    }
}

/**
 * @swagger
 * components:
 *   schemas:
 *     Player:
 *       type: object
 *       properties:
 *         Known As:
 *           type: string
 *           example: "L. Messi"
 *         Full Name:
 *           type: string
 *           example: "Lionel Messi"
 *         Overall:
 *           type: integer
 *           example: 91
 *         Potential:
 *           type: integer
 *           example: 91
 *         Value(in Dallor):
 *           type: string
 *           example: "55080810.9"
 *         Best Position:
 *           type: string
 *           example: "CAM"
 *         Nationality:
 *           type: string
 *           example: "Argentina"
 *         Image Link:
 *           type: string
 *           example: "https://cdn.sofifa.net/players/158/023/23_60.png"
 *         Age:
 *           type: integer
 *           example: 35
 *         Height(in cm):
 *           type: integer
 *           example: 169
 *         Weight(in kg):
 *           type: integer
 *           example: 67
 *         Club Name:
 *           type: string
 *           example: "Paris Saint-Germain"
 *         Club Jersey Number:
 *           type: string
 *           example: "30"
 *         Preferred Foot:
 *           type: string
 *           example: "Left"
 *         National Team Image Link:
 *           type: string
 *           example: "https://cdn.sofifa.net/flags/ar.png"
 *         National Team Position:
 *           type: string
 *           example: "RW"
 *         Pace Total:
 *           type: integer
 *           example: 81
 *         Shooting Total:
 *           type: integer
 *           example: 89
 *         Passing Total:
 *           type: integer
 *           example: 90
 *         Dribbling Total:
 *           type: integer
 *           example: 94
 *         Defending Total:
 *           type: integer
 *           example: 34
 *         Physicality Total:
 *           type: integer
 *           example: 64
 *         # 아래와 같은 식으로 필요한 항목들 계속 정의 가능
 */

/**
 * @swagger
 * /players:
 *   get:
 *     summary: 전체 선수 목록 조회
 *     responses:
 *       200:
 *         description: 성공적으로 선수 목록을 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
app.get("/players", (req, res) => {
    const players = loadData();
    res.json(players);
});

/**
 * @swagger
 * /players/find:
 *   get:
 *     summary: 이름(일부 혹은 전부)으로 선수 목록 필터링
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: 찾고자 하는 선수의 이름(일부 문자열도 가능)
 *     responses:
 *       200:
 *         description: 필터링된 선수 목록을 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 */
app.get("/players/find", (req, res) => {
    const { name } = req.query; // GET /players/find?name=Messi
    const players = loadData();

    // name 파라미터가 없거나 빈 값이면 전체 선수 목록 반환
    if (!name) {
        return res.json(players);
    }

    // 부분 일치(대소문자 무시)하여 필터링
    const filtered = players.filter((player) => {
        // 예: "Known As" 키에서 검색 (또는 Full Name 등 원하는 필드)
        // "Known As"가 존재하는지 확인 후, 소문자로 비교
        const knownAs = player["Known As"]?.toLowerCase() || "";
        return knownAs.includes(name.toLowerCase());
    });

    res.json(filtered);
});

/**
 * @swagger
 * /players/{index}:
 *   get:
 *     summary: 특정 인덱스 선수 조회
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: after.json 배열의 인덱스
 *     responses:
 *       200:
 *         description: 성공적으로 선수 정보를 반환
 *       404:
 *         description: 해당 인덱스의 선수가 존재하지 않음
 */
app.get("/players/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const players = loadData();

    if (isNaN(index) || index < 0 || index >= players.length) {
        return res.status(404).json({ error: "Player not found" });
    }

    return res.json(players[index]);
});

/**
 * @swagger
 * /players:
 *   post:
 *     summary: 선수 추가
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       201:
 *         description: 선수 생성 성공
 */
app.post("/players", (req, res) => {
    const players = loadData();
    const newPlayer = req.body;
    players.push(newPlayer);
    saveData(players);

    res.status(201).json({ message: "Player created", data: newPlayer });
});

/**
 * @swagger
 * /players/{index}:
 *   put:
 *     summary: 선수 정보 수정
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: 수정할 선수 인덱스
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Player'
 *     responses:
 *       200:
 *         description: 선수 업데이트 성공
 *       404:
 *         description: 해당 선수를 찾을 수 없음
 */
app.put("/players/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const players = loadData();

    if (isNaN(index) || index < 0 || index >= players.length) {
        return res.status(404).json({ error: "Player not found" });
    }

    players[index] = { ...players[index], ...req.body };
    saveData(players);

    res.json({ message: "Player updated", data: players[index] });
});

/**
 * @swagger
 * /players/{index}:
 *   delete:
 *     summary: 선수 삭제
 *     parameters:
 *       - in: path
 *         name: index
 *         required: true
 *         schema:
 *           type: integer
 *         description: 삭제할 선수 인덱스
 *     responses:
 *       200:
 *         description: 선수 삭제 성공
 *       404:
 *         description: 해당 선수를 찾을 수 없음
 */
app.delete("/players/:index", (req, res) => {
    const index = parseInt(req.params.index, 10);
    const players = loadData();

    if (isNaN(index) || index < 0 || index >= players.length) {
        return res.status(404).json({ error: "Player not found" });
    }

    const deletedPlayer = players.splice(index, 1);
    saveData(players);

    res.json({ message: "Player deleted", data: deletedPlayer });
});

/**
 * @swagger
 * /players/findByFilters:
 *   post:
 *     summary: 여러 조건으로 선수 필터링
 *     description: Body에 포함된 조건(`Full Name`, `Nationality`, `Position`)을 기반으로 선수 목록을 필터링합니다.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Full Name:
 *                 type: string
 *                 description: 선수의 이름 (부분 일치 검색)
 *                 example: Messi
 *               Nationality:
 *                 type: string
 *                 description: 선수의 국적 (완전 일치 검색)
 *                 example: Argentina
 *               Position:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: 선수가 가진 포지션 중 하나라도 포함되는지 확인
 *                 example: ["CAM", "ST"]
 *     responses:
 *       200:
 *         description: 필터링된 선수 목록을 반환합니다.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Player'
 *       400:
 *         description: 요청 본문이 잘못되었거나 조건에 맞는 선수가 없습니다.
 */
app.post("/players/findByFilters", (req, res) => {
    const filters = req.body; // Body에서 필터 조건을 가져옵니다
    const players = loadData(); // after.json 로드

    // 필터 입력값 검증
    if (!filters || typeof filters !== "object") {
        return res.status(400).json({ error: "Invalid filter format" });
    }

    let filtered = players;

    // (1) Full Name 부분 일치
    if (filters["Full Name"]) {
        const searchName = filters["Full Name"].toLowerCase();
        filtered = filtered.filter((player) =>
            (player["Full Name"] || "").toLowerCase().includes(searchName)
        );
    }

    // (2) Nationality 완전 일치
    if (filters["Nationality"]) {
        const searchNationality = filters["Nationality"].toLowerCase();
        filtered = filtered.filter(
            (player) =>
                (player["Nationality"] || "").toLowerCase() ===
                searchNationality
        );
    }

    // (3) Position 배열 중 하나라도 매칭
    if (Array.isArray(filters.Position) && filters.Position.length > 0) {
        filtered = filtered.filter((player) => {
            const bestPositions = Array.isArray(player["Best Position"])
                ? player["Best Position"]
                : [player["Best Position"] || ""];
            return filters.Position.some((pos) => bestPositions.includes(pos));
        });
    }

    // 조건이 적용된 결과 반환
    return res.json(filtered);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});
