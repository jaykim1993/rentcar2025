<?php
// DB 연결
include '../config/database.php';

// 클라이언트에서 보낸 JSON 데이터 읽기
$data = json_decode(file_get_contents("php://input"), true);

// action 구분 (checkId / signup)
$action = $data['action'] ?? '';

if ($action === 'checkId') {
    // ------------------ 아이디 중복 확인 ------------------
    $userid = $data['userid'] ?? '';
    if (!$userid) {
        echo json_encode(["exists" => false]);
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM users WHERE userid=?");
    $stmt->bind_param("s", $userid);
    $stmt->execute();
    $result = $stmt->get_result();

    echo json_encode(["exists" => $result->num_rows > 0]);

    $stmt->close();
    $conn->close();
    exit;
}

// ------------------ 회원가입 처리 ------------------
$userid = $data['userid'] ?? '';
$userpw = $data['userpw'] ?? '';
$username = $data['username'] ?? '';
$user_email = $data['user_email'] ?? '';
$user_resistnum = $data['user_resistnum'] ?? '';
$user_phonenum = $data['user_phonenum'] ?? '';
$user_license = $data['user_license'] ?? '';
$address = $data['address'] ?? '';
$address_detail = $data['address_detail'] ?? '';
$user_iskorean = $data['user_iskorean'] ?? '';

// 필수값 확인
if (empty($userid) || empty($userpw) || empty($username) || empty($user_email) || empty($user_resistnum) || empty($user_phonenum)) {
    echo json_encode([
        "status" => "fail",
        "message" => "필수 입력 사항을 입력해주세요."
    ]);
    exit;
}

// 아이디 중복 확인
$stmt = $conn->prepare("SELECT * FROM users WHERE userid=?");
$stmt->bind_param("s", $userid);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo json_encode([
        "status" => "fail",
        "message" => "이미 존재하는 아이디 입니다."
    ]);
    $stmt->close();
    $conn->close();
    exit;
}

// 회원가입 INSERT
$sql = "INSERT INTO users (userid, username, userpw, user_email, user_resistnum, user_phonenum, user_license, address, address_detail, user_iskorean) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param(
    "ssssssssss",
    $userid, $username, $userpw, $user_email, $user_resistnum, $user_phonenum, $user_license, $address, $address_detail, $user_iskorean
);

$response = [];

if ($stmt->execute()) {
    $response["status"] = "success";
    $response["message"] = "회원가입이 완료되었습니다.";
} else {
    $response["status"] = "fail";
    $response["message"] = "회원가입이 실패하였습니다.";
}

echo json_encode($response);

$stmt->close();
$conn->close();
?>
