// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const path = require("path");

// Swagger 옵션 설정
const options = {
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
                url: "http://localhost:3001", // 배포 시 실제 서버 URL로 변경
                description: "Local server",
            },
        ],
    },
    // API 문서화할 파일(라우팅이 정의된 파일) 경로
    apis: [path.join(__dirname, "index.js")],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
