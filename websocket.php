<?php
$server=new server();
global $time;
class server{
    private $addr="0.0.0.0";
    private $port="9502";
    public $time=0;
    public $redis;
    public $name;
    public $users=array(
    );
    function __construct(){
        $this->lock=new swoole_lock(SWOOLE_MUTEX);
        $this->server=new swoole_websocket_server($this->addr,$this->port);
        $this->server->set(array(
            'daemonize' => 0,
            'worker_num' => 4,
            'task_worker_num' => 10,
            'max_request' => 1000,
            'log_file' => ROOT_PATH . 'storage\\logs\\swoole.log'
        ));
        $this->redis = new Redis();
        $this->redis->connect("127.0.0.1",6379);
        $this->redis->delete("users");
        $this->server->on('open',array($this,'onopen'));
        $this->server->on('message',array($this,'onmessage'));
        $this->server->on('task', array($this, 'onTask'));
        $this->server->on('finish',array($this,'onfinish'));
        $this->server->on('close',array($this,'onclose'));
        $this->server->start();
    }
    public function onopen($server,$request){
        $this->time=$this->time+1;
        $message=array(
            'remote_addr'=>$request->server['remote_addr'],
            'request_time' => date('Y-m-d H:i:s', $request->server['request_time'])
        );
        echo json_encode($message);
    }
    public function onmessage($server,$frame){
        $data=json_decode($frame->data);
        echo $frame->data;
        switch ($data->type){
            case 'init':
                //$this->users[$data->username]=$frame->fd;
                if($this->redis->exists('users')==false)
                {
                    $arr=array();
                    $this->redis->set('users',json_encode($arr));
                }
                $this->name=$data->username;
                $user = json_decode($this->redis->get('users'));
                //var_dump($user);
                $user = json_decode($this->redis->get('users'));
                $user[] = array(
                    $data->username => $frame->fd
                );
                $this->redis->set('users', json_encode($user));
                $message='it is nice to your connect!'.$data->username;
                $count=count($user);
                $response=array(
                    'type'=>'system',
                    'online'=>$user,
                    'count'=>$count,
                    'online_count'=>count($this->server->connections),
                    'time'=>$this->time
                );
                $this->server->push($frame->fd,json_encode($response));
                break;
            case 'chat':
                $source=$data->source;
                if($source=="system")
                {
                    if($data->check_code=="13036591969")
                    {
                        $response=$data->message;
                        $this->server->task($response);
                    }
                }
                else{
                    $to=$data->to;
                    $response=array(
                        $source=$data->source,
                        $message=$data->message,
                    );
                    $user=json_decode($this->redis->get('users'));
                    $i=0;
                    foreach ($user as $to_user)
                    {
                        if(array_keys(get_object_vars($to_user))['0']==$to)
                        {
                            var_dump(get_object_vars($user[$i])[$to]);
                            $this->server->push(strval(get_object_vars($user[$i])[$to]),json_encode($response));
                            break;
                        }
                        $i++;
                    }
                }
                break;
            default:
                return false;
        }
    }
    public function onTask($server,$task_id,$form_id,$message){
        foreach ($this->server->connections as $fd)
        {
            $this->server->push($fd,json_encode($message));
        }
        $server->finish('Task'.$task_id.'Finished'.PHP_EOL);
    }
    public function onclose($server,$fd){
        $user=json_decode($this->redis->get('users'));
        var_dump($user);
        $new_user=array();
        foreach ($user as $us)
        {
            var_dump(array_keys(get_object_vars($us)));
            if(array_keys(get_object_vars($us))['0']==$this->name)
            {
                continue;
            }
            $new_user[]=$us;
        }
        $this->redis->set('users',$user);
        var_dump($new_user);
        $this->lock->lock();
        unset($this->users[$fd]);
        $this->lock->unlock();
        echo $fd."close()";
        unset($fd);
    }
    public function onfinish(){

    }
}
?>