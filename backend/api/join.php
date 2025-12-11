<?php
// DB 연결이 들어있는 config의 database.php를 포함
include '../config/database.php';

// 클라이언트에서 보낸 JSON 데이터 읽기
    // React나 다른 프론트엔드에서 fetch/axios로 보낸 POST 데이터를
    // php://input을 통해 읽고, json_decode로 배열로 변환
    // 변환한 데이터를 담을 변수 $data 선언
$data = json_decode(file_get_contents("php://input"), true);

// joinForm으로부터 입력된 인풋값을 axios통해 받아왔고,
// JSON 데이터 변수로 변환 값 저장
$userid = $data['userid'];
$userpw = $data['userpw'];
$username = $data['username'];
$user_email = $data ['user_email'];
$user_resistnum = $data ['user_resistnum'];
$user_phonenum = $data ['user_phonenum'];
$address = $data['address'] ?? '';
// $address_detail = $data['address_detail'] ?? '';
// $user_iskorean = $data['user_iskorean'] ?? '';
// $user_license = $data ['user_license'] ?? '';

// ---------------------------
// 예외처리1 => 빈값 입력 방지
    // 회원가입 시 input에 아무것도 입력하지 않으면 삽입 안되야함
    // empty() => 비어있다 (java나 스프링부트에서도 쓰임)
if (empty($userid) || empty($userpw) || empty($username) || empty($user_email) || empty($user_resistnum) || empty($user_phonenum)) {
    echo json_encode([
        "status" => "fail",
        "message" => "모든 필드를 입력해주세요."
    ]);
    exit;
}

// ---------------------------
// 예외처리2 => ID 중복값 입력 방지
$stmt = $conn->prepare("SELECT * FROM users WHERE userid=?");
    // 입력된 id 값과 같은게 있다면 stmt에 저장
$stmt->bind_param("s", $userid);
    // 데이터타입 약자이다. 
    // s: string(문자), i: integer(정수), d: double(실수)
$stmt->execute();
    // 쿼리 실행 명령문(여기선 select문 실행)
$result = $stmt->get_result();
    // 쿼리 중 select는 반드시 get_result를 통해 $result에 담아야함

if($result->num_rows > 0) {
    // num_rows > 0 이면 이미 입력한 userid는 존재함 고로 사용 불가
    echo json_encode([
        "status" => "fail", 
        "message"=>"이미 존재하는 아이디 입니다."
    ]);
    // 검색한 stmt 문 종료
    $stmt->close();
    // 연결한 connection 종료
    $conn->close();
    exit;
}

// ---------------------------
// 예외조건 해당 안된다면 
// INSERT 하기 (Prepared Statement)
$sql = "INSERT INTO users (userid, username, userpw, user_email, user_resistnum, user_phonenum, user_license) VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
// 입력받은 세개의 값을 데이터 바인딩(특별한 위치에 연결) 하기
$stmt->bind_param("sssssss", $userid, $username, $userpw, $user_email, $user_resistnum, $user_phonenum, $user_license);

$response = [];

if ($stmt->execute()) {
    $response["status"] = "success";
    $response["message"] = "회원가입이 완료되었습니다.";
} else {
    $response["status"] = "fail";
    $response["message"] = "회원가입이 실패하였습니다.";
}

// 클라이언트에게 결과 전송
echo json_encode($response);

// 검색한 stmt 문 종료
$stmt->close();
// 연결한 connection 종료
$conn->close();
?>
