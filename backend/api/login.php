<?php
include '../config/database.php';

// LoginForm.jsx에서 userid, userpw 입력받아서
// 기존 DB에 데이터 존재하는지 확인 후 로그인 성공/실패
// JSON 데이터 받기
    // React나 다른 프론트엔드에서 fetch/axios로 보낸 POST 데이터를
    // php://input을 통해 읽고, json_decode로 배열로 변환
    // 변환한 데이터를 담을 변수 $data 선언
$data = json_decode(file_get_contents('php://input'), true);

// 가져온 userid, userpw를 담을 변수 생성 및 가져오기(없다면 공백)
$userid = $data['userid'];
$userpw = $data['userpw'];

// 빈값 체크
// empty(value) => value가 비어있으면 true, 아니면 false
// ehco => 메세지 출력
// json_encode()로 메시지 저장한다.
// 방식은 연관배열 => ['name' => 'value', 'pw' => 'value']
if (empty($userid) || empty($userpw)) {
    echo json_encode([
        'status' => 'fail',
        'message' => '아이디, 비밀번호 모두 입력해주세요.'
    ]);
    exit;
}
// DB 사용자 정보 조회
// SELECT userid, userpw FROM users WHERE userid=? AND userpw=?
// sql문 작성 시 담을 변수 지정
$sql = 'SELECT userid, userpw, username, user_email ,user_resistnum, user_phonenum , address, address_detail, user_iskorean, user_license FROM users WHERE userid=? AND userpw=?';
// admin, 1234 => 결과를 만족하면 출력될 데이터
// DB에 연결해야 sql문을 실행할 수 있다.
$stmt = $conn->prepare($sql);
// bind_param('데이터타입', 입력받은 값)
$stmt->bind_param('ss', $userid, $userpw);
// sql문을 실행한다.
$stmt->execute();
// result 변수에 select 결과값을 담는다.
$result = $stmt->get_result();

// 결과를 배열로 된 변수에 저장한다.
$response = [];

if ($result->num_rows >= 1) {
    $user = $result->fetch_assoc();   // 이과정을 하지 않으면 DB 내 정보가 안들어온다
    // 셀렉트문으로 추출한 결과를 배열로 가져오는 메서드(한줄의 배열로 저장한다.)
    $response['status'] = 'success';
    $response['message'] = '로그인 성공';
    $response['userid'] = $user['userid']; // 한줄의 배열
    $response['username'] = $user['username']; // 한줄의 배열
    $response['user_email'] = $user['user_email']; // 한줄의 배열
    $response['user_resistnum'] = $user['user_resistnum']; // 한줄의 배열
    $response['user_phonenum'] = $user['user_phonenum']; // 한줄의 배열
    $response['address'] = $user['address']; // 한줄의 배열
    $response['address_detail'] = $user['address_detail']; // 한줄의 배열
    $response['user_iskorean'] = $user['user_iskorean']; // 한줄의 배열
    $response['user_license'] = $user['user_license']; // 한줄의 배열
}
else {
    // 로그인할 id, pw가 존재하지 않을 때
    $response['status'] = 'fail';
    $response['message'] = '아이디 또는 비밀번호가 일치하지 않습니다.';
}
// React의 오브젝트 배열로 반환
// => json_encode($response)
// {'status' : 'success', 'message' : '로그인 성공'}
echo json_encode($response);

// 검색한 stmt 문 종료
$stmt->close();
// 연결한 connection 종료
$conn->close();
?>
