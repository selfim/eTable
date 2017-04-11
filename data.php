<?php 

//echo "hello";
$action = isset($_GET['action'])?$_GET['action']:'';
switch ($action) {
	case 'initDataList':
		initDataList();
		break;
	case 'delRow':
		delRow();
		break;
	case 'addRow':
	    addRow();
		break;
	case 'editRow':
		editRow();
		break;
	default:
		# code...
		break;
}
function initDataList()
{

	$sql ="SELECT * FROM `et_data`";
	$query = query_sql($sql);
	$data =array();
	while ($row=$query->fetch_assoc()) {
		$data[] = $row;
	}
	
	echo json_encode($data);
}
function delRow(){
	$dataId = $_POST['dataId'];
	$sql ="DELETE FROM `et_data` WHERE `id`=".$dataId;
	if (query_sql($sql)) {
		echo "ok";
	}else{
		echo "wrong";
	}
}
function addRow(){
	//var_dump($_POST);
	$sql ="INSERT INTO `et_data` (`c_a`,`c_b`,`c_c`,`c_d`,`c_e`,`c_f`,`c_g`,`c_h`)VALUES(";
	for ($i=0; $i < 8; $i++) { 
		$sql.='\''.$_POST['col_'.$i].'\',';
	}
	$sql =trim($sql,',');
	//echo $sql;
	$sql.=')';
	if ($res =query_sql($sql,"SELECT LAST_INSERT_ID() as LD")) {
		$lastInsertId = $res->fetch_assoc();
		echo $lastInsertId['LD'];
	}else{
		echo "wrong";
	}
}
function editRow(){
	//var_dump($_POST);exit();
	$sql = 'UPDATE `et_data` SET ';
	$id = $_POST['id'];
	unset($_POST['id']);
	for($i = 0 ; $i < 8 ; $i++){
		$sql .= ' `c_' . chr(97+$i) . '` = \'' . $_POST['col_' . $i] . '\' , ';//ASCII码
	}
	$sql = trim($sql,", ");
	$sql .= ' WHERE `id` = ' . $id ;
	//echo $sql;exit();
	if(query_sql($sql)){
		echo "ok";	
	} else {
		echo "wrong";	
	}
}
function query_sql(){
	$mysqli = new mysqli("127.0.0.1", "root", "123456", "etable");
	$sqls = func_get_args();
	foreach($sqls as $s){
		$query = $mysqli->query($s);
	}
	$mysqli->close();
	return $query;
}
	