#!/bin/bash

# 실행할 커멘드와 로그 파일 설정
CMD="npm run start"
LOG_FILE="twig-fe.log"

# 실행 파일을 백그라운드로 실행하는 함수
run_background() {
    # 실행 파일을 백그라운드에서 실행하고 프로세스 ID를 저장
    $CMD >> $LOG_FILE &
    PID=$!

    # 백그라운드에서 실행되고 있는지 확인
    if ps -p $PID > /dev/null; then
        echo "프로그램이 백그라운드에서 실행되었습니다. PID: $PID"
    else
        echo "프로그램 실행에 실패했습니다."
    fi
}

# 프로세스를 종료하는 함수
stop_process() {
    # 프로세스 ID가 인자로 전달되었는지 확인
    if [ -z "$1" ]; then
        echo "프로세스 ID를 지정해주세요."
        exit 1
    fi

    # 프로세스 종료
    if kill "$1"; then
        echo "프로세스가 성공적으로 종료되었습니다."
    else
        echo "프로세스 종료에 실패했습니다."
    fi
}

# 스크립트 실행 시 전달된 인자에 따라 동작 설정
case "$1" in
    start)
        run_background
        ;;
    stop)
        stop_process "$2"
        ;;
    *)
        echo "사용법: $0 {start|stop [PID]}"
        exit 1
        ;;
esac

exit 0

