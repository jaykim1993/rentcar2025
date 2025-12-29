<?php
//CORS 설정(React에서 접근 가능하도록 지정)
// header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Origin: http://222.122.39.49");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=UTF-8");

// OPTIONS 요청 처리 (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
http_response_code(200);
exit();
}

// 데이터베이스 연결정보 
// define() => 정의하다
//  db_host = localhost의미함
define('db_host','localhost');
define('db_user','charang2025'); // 카페24 DB 아이디
define('db_pass','Rentcar2025!!'); // 카페24 DB 비밀번호
define('db_name','charang2025'); // 카페24 DB 아이디와 동일

// 데이터베이스 연결 함수 생성
function getDBConnection(){
    $conn = new mysqli(db_host,db_user,db_pass,db_name);

    //연결 오류 체크 코드
    if($conn->connect_error){
        die(json_encode([
            "status" => "fali",
            "message" => "DB 연결 실패".$conn->connect_error
        ]));
    }
    $conn->set_charset('utf8mb4');
    return $conn;
}

// 연결 객체 생성
$conn = getDBConnection();
?>