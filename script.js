document.addEventListener('DOMContentLoaded', function () {
    // 1. 데이터 준비 (CSV 파일 분석 결과를 하드코딩)
    const categories = ['교육', '환경', '복지', '교통'];
    const postCounts = [3, 2, 2, 1];
    const recommendationCounts = [498, 36, 368, 289];

    // 2. 차트 생성
    const ctx = document.getElementById('categoryChart').getContext('2d');
    const recommendationAlert = document.getElementById('recommendation-alert');

    const categoryChart = new Chart(ctx, {
        type: 'bar', // 막대 그래프
        data: {
            labels: categories,
            datasets: [{
                label: '게시글 수',
                data: postCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
                borderRadius: 5,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        // y축 눈금이 정수만 표시되도록 설정
                        stepSize: 1
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // 범례 숨기기
                },
                tooltip: {
                    // 기본 툴팁 비활성화 (커스텀 알림창 사용)
                    enabled: false
                }
            },
            // 3. 클릭 이벤트 처리
            onClick: (event, elements) => {
                if (elements.length > 0) {
                    // 클릭된 막대의 인덱스를 가져옴
                    const clickedIndex = elements[0].index;
                    
                    // 해당 카테고리와 총 추천수를 가져옴
                    const category = categories[clickedIndex];
                    const totalRecs = recommendationCounts[clickedIndex];

                    // 알림창 내용 설정 및 표시
                    recommendationAlert.innerHTML = `<strong>${category}</strong><br>총 추천수: ${totalRecs.toLocaleString()}개`;
                    recommendationAlert.style.display = 'block';
                    recommendationAlert.style.opacity = 1;

                } else {
                    // 막대 바깥을 클릭하면 알림창 숨기기
                   recommendationAlert.style.opacity = 0;
                   // 트랜지션이 끝난 후 완전히 숨김
                   setTimeout(() => {
                       if (recommendationAlert.style.opacity === '0') {
                           recommendationAlert.style.display = 'none';
                       }
                   }, 300);
                }
            }
        }
    });
});
