$(function(){
    $('.bx-wrapper').css('max-width', 'auto');
    
    // 화면 크기에 따라 자동 재생 설정
    function setAutoPlay() {
        var isMobile = window.innerWidth <= 768;
        var slider = $('.slide_gallery').data('bxSlider');
        
        if (slider) {
            if (isMobile) {
                slider.startAuto();
            } else {
                slider.stopAuto();
            }
        }
    }
    
    $('.slide_gallery').bxSlider({
        mode: 'fade',
        auto: false, // 초기에는 자동 재생 비활성화
        speed: 500,
        pause: 4000,
        autoControls: false,
        autoHover: true,
        pager: true,
        controls: true,
        slideWidth: 0,
        infiniteLoop: true,
        hideControlOnEnd: false,
        touchEnabled: false,
        useCSS: true,
        adaptiveHeight: false,
        onSlideBefore: function() {
            // 슬라이드 전환 전 안정화
            $(this).find('img').css('opacity', '0.9');
        },
        onSlideAfter: function() {
            // 슬라이드 전환 후 안정화
            $(this).find('img').css('opacity', '1');
        },
        onSliderLoad: function() {
            // 슬라이더 로드 후 화면 크기에 따라 자동 재생 설정
            setAutoPlay();
        }
    });
    
    // 화면 크기 변경 시 자동 재생 재설정
    $(window).on('resize', function() {
        setAutoPlay();
    });

    $('.menu_toggle_btn').click(function(){
        $('.gnb').stop().toggle();
    });

    // 폼 검증 - 올바른 선택자 사용
    $('.form_box').on('click', function(e) {
        e.preventDefault();
        console.log('폼 submit 이벤트 실행됨');
        let isValid = true;

        // Name
        const $nameGroup = $('#name').closest('.input-group');
        const $nameInput = $('#name');
        const $nameError = $nameGroup.find('.error-message');
        if (!$nameInput.val().trim()) {
            $nameInput.addClass('error');
            $nameGroup.addClass('error');
            $nameError.text('이 필드는 필수입니다.');
            isValid = false;
        } else {
            $nameInput.removeClass('error');
            $nameGroup.removeClass('error');
            $nameError.text('');
        }

        // Phone
        const $phoneGroup = $('#phone').closest('.input-group');
        const $phoneInput = $('#phone');
        const $phoneError = $phoneGroup.find('.error-message');
        const phoneVal = $phoneInput.val().trim();
        const phonePattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
        if (!phoneVal) {
            $phoneInput.addClass('error');
            $phoneGroup.addClass('error');
            $phoneError.text('이 필드는 필수입니다.');
            isValid = false;
        } else if (!phonePattern.test(phoneVal)) {
            $phoneInput.addClass('error');
            $phoneGroup.addClass('error');
            $phoneError.text('유효한 전화번호를 입력하세요. (예: 010-1234-5678)');
            isValid = false;
        } else {
            $phoneInput.removeClass('error');
            $phoneGroup.removeClass('error');
            $phoneError.text('');
        }

        // Email
        const $emailGroup = $('#email').closest('.input-group');
        const $emailInput = $('#email');
        const $emailError = $emailGroup.find('.error-message');
        const emailVal = $emailInput.val().trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailVal) {
            $emailInput.addClass('error');
            $emailGroup.addClass('error');
            $emailError.text('이 필드는 필수입니다.');
            isValid = false;
        } else if (!emailPattern.test(emailVal)) {
            $emailInput.addClass('error');
            $emailGroup.addClass('error');
            $emailError.text('유효한 이메일 주소를 입력하세요.');
            isValid = false;
        } else {
            $emailInput.removeClass('error');
            $emailGroup.removeClass('error');
            $emailError.text('');
        }

        // Message
        const $messageGroup = $('#message').closest('.input-group');
        const $message = $('#message');
        const $messageError = $messageGroup.find('.error-message');

        if (!$message.val().trim()) {
            $message.addClass('error');
            $messageGroup.addClass('error');
            $messageError.text('이 필드는 필수입니다.');
            isValid = false;
        } else {
            $message.removeClass('error');
            $messageGroup.removeClass('error');
            $messageError.text('');
        }

        if (isValid) {
            const name = $nameInput.val().trim();
            const phone = phoneVal;
            const email = emailVal;
            const message = $('#message').val().trim();
            
            // 성공 alert 팝업
            alert(`✅ 전송이 완료되었습니다!`);
            
            // 폼 초기화 (선택사항)
            $('.form_box')[0].reset();
            
            // 모든 에러 스타일 제거
            $('.form_box .input-group').removeClass('error');
            $('.form_box input, .form_box textarea').removeClass('error');
            $('.form_box .error-message').text('');
            
            // 전송 버튼 임시 비활성화 (중복 전송 방지)
            const $submitBtn = $('.form_box button[type="submit"], .form_box input[type="submit"]');
            const originalText = $submitBtn.text();
            $submitBtn.prop('disabled', true).text('전송완료 ✓');
            
            setTimeout(function() {
                $submitBtn.prop('disabled', false).text(originalText);
            }, 2000);
        }
    });

    // 실시간 검증 (blur 시)
    $('.form_box input').on('blur', function() {
        const $input = $(this);
        const $group = $input.closest('.input-group');
        const $error = $group.find('.error-message');
        const value = $input.val().trim();
        if ($input.attr('id') === 'phone') {
            const phonePattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
            if (!value) {
                $input.addClass('error');
                $group.addClass('error');
                $error.text('이 필드는 필수입니다.');
            } else if (!phonePattern.test(value)) {
                $input.addClass('error');
                $group.addClass('error');
                $error.text('유효한 전화번호를 입력하세요. (예: 010-1234-5678)');
            } else {
                $input.removeClass('error');
                $group.removeClass('error');
                $error.text('');
            }
        } else if ($input.attr('type') === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!value) {
                $input.addClass('error');
                $group.addClass('error');
                $error.text('이 필드는 필수입니다.');
            } else if (!emailPattern.test(value)) {
                $input.addClass('error');
                $group.addClass('error');
                $error.text('유효한 이메일 주소를 입력하세요.');
            } else {
                $input.removeClass('error');
                $group.removeClass('error');
                $error.text('');
            }
        } else {
            if (!value) {
                $input.addClass('error');
                $group.addClass('error');
                $error.text('이 필드는 필수입니다.');
            } else {
                $input.removeClass('error');
                $group.removeClass('error');
                $error.text('');
            }
        }
    });

    // 부드러운 스크롤
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800);
        }
    });

    // 키보드 네비게이션
    $('.gnb a').on('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            $(this).click();
        }
    });

    // 확인 다이얼로그 함수
    window.showConfirmDialog = function(message, callback) {
        if (confirm(message)) {
            if (typeof callback === 'function') {
                callback();
            }
        }
    };

    // 커스텀 알림 함수 (더 예쁜 알림을 원할 경우)
    window.showCustomAlert = function(title, message, type = 'success') {
        // 간단한 커스텀 알림 (필요시 라이브러리 사용 가능)
        const alertClass = type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️';
        alert(`${alertClass} ${title}\n\n${message}`);
    };

    // SUPPORT 섹션 클릭 이벤트
    $('.support_list li button').on('click', function(e) {
        e.preventDefault();
        var supportType = $(this).find('h3').text().trim();
        showSupportForm(supportType);
    });

    // RESCUE 섹션 이미지 클릭 이벤트
    $('.escue_list li button').on('click', function(e) {
        e.preventDefault();
        var $img = $(this).find('img');
        var imgSrc = $img.attr('src');
        var imgAlt = $img.attr('alt');
        var dogName = $(this).find('h3').text().trim();
        var dogInfo = $(this).find('span').html();
        showImageModal(imgSrc, imgAlt, dogName, dogInfo);
    });

    // 후원 신청서 폼 표시 함수
    function showSupportForm(supportType) {
        var formHTML = `
            <div class="support-modal-overlay">
                <div class="support-modal">
                    <div class="modal-header">
                        <h3>${supportType} 신청서</h3>
                        <button class="close-btn">&times;</button>
                    </div>
                    <div class="modal-body">
                        <form class="support-form">
                            <div class="form-group">
                                <label for="supporter-name">이름 <span class="required">*</span></label>
                                <input type="text" id="supporter-name" name="name" required>
                            </div>
                            <div class="form-group">
                                <label for="supporter-phone">연락처 <span class="required">*</span></label>
                                <input type="tel" id="supporter-phone" name="phone" placeholder="010-1234-5678" required>
                            </div>
                            <div class="form-group">
                                <label for="supporter-email">이메일 <span class="required">*</span></label>
                                <input type="email" id="supporter-email" name="email" required>
                            </div>
                            <div class="form-group">
                                <label for="support-amount">후원 금액 <span class="required">*</span></label>
                                <select id="support-amount" name="amount" required>
                                    <option value="">금액을 선택하세요</option>
                                    <option value="10000">10,000원</option>
                                    <option value="30000">30,000원</option>
                                    <option value="50000">50,000원</option>
                                    <option value="100000">100,000원</option>
                                    <option value="custom">직접 입력</option>
                                </select>
                            </div>
                            <div class="form-group custom-amount" style="display: none;">
                                <label for="custom-amount">직접 입력 금액</label>
                                <input type="number" id="custom-amount" name="customAmount" placeholder="금액을 입력하세요">
                            </div>
                            <div class="form-group">
                                <label for="support-message">메시지 (선택사항)</label>
                                <textarea id="support-message" name="message" rows="4" placeholder="후원 동기나 메시지를 남겨주세요" style="resize: none;"></textarea>
                            </div>
                            <div class="form-actions">
                                <button type="submit" class="submit-btn">후원 신청하기</button>
                                <button type="button" class="cancel-btn">취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(formHTML);
        
        // 모달 닫기 이벤트
        $('.support-modal-overlay').on('click', function(e) {
            if (e.target === this) {
                closeSupportForm();
            }
        });
        
        $('.close-btn, .cancel-btn').on('click', function() {
            closeSupportForm();
        });
        
        // 금액 선택 이벤트
        $('#support-amount').on('change', function() {
            if ($(this).val() === 'custom') {
                $('.custom-amount').show();
            } else {
                $('.custom-amount').hide();
            }
        });
        
        // 폼 제출 이벤트
        $('.support-form').on('submit', function(e) {
            e.preventDefault();
            handleSupportFormSubmit(supportType);
        });
    }

    // 후원 신청서 폼 닫기
    function closeSupportForm() {
        $('.support-modal-overlay').remove();
    }

    // 후원 신청서 제출 처리
    function handleSupportFormSubmit(supportType) {
        var formData = {
            type: supportType,
            name: $('#supporter-name').val(),
            phone: $('#supporter-phone').val(),
            email: $('#supporter-email').val(),
            amount: $('#support-amount').val() === 'custom' ? $('#custom-amount').val() : $('#support-amount').val(),
            message: $('#support-message').val()
        };
        
        // 간단한 검증
        if (!formData.name || !formData.phone || !formData.email || !formData.amount) {
            alert('필수 항목을 모두 입력해주세요.');
            return;
        }
        
        // 성공 메시지
        alert(`✅ ${supportType} 신청이 완료되었습니다!\n\n이름: ${formData.name}\n연락처: ${formData.phone}\n이메일: ${formData.email}\n후원금액: ${formData.amount}원`);
        
        closeSupportForm();
    }

    // 이미지 확대 모달 표시 함수
    function showImageModal(imgSrc, imgAlt, dogName, dogInfo) {
        var modalHTML = `
            <div class="image-modal-overlay">
                <div class="image-modal">
                    <div class="image-modal-header">
                        <h3>${dogName}</h3>
                        <button class="image-close-btn">&times;</button>
                    </div>
                    <div class="image-modal-body">
                        <div class="image-container">
                            <img src="${imgSrc}" alt="${imgAlt}" class="expanded-image">
                        </div>
                        <div class="dog-info">
                            <h4>강아지 정보</h4>
                            <div class="info-content">
                                ${dogInfo}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        $('body').append(modalHTML);
        
        // 모달 닫기 이벤트
        $('.image-modal-overlay').on('click', function(e) {
            if (e.target === this) {
                closeImageModal();
            }
        });
        
        $('.image-close-btn').on('click', function() {
            closeImageModal();
        });
        
        // ESC 키로 닫기
        $(document).on('keydown.imageModal', function(e) {
            if (e.key === 'Escape') {
                closeImageModal();
            }
        });
    }

    // 이미지 모달 닫기
    function closeImageModal() {
        $('.image-modal-overlay').remove();
        $(document).off('keydown.imageModal');
    }
});

// 유틸리티 함수들
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
    return phoneRegex.test(phone);
}

function showError($field, message) {
    clearError($field);
    $field.addClass('error');
    $field.after(`<div class="error-message" role="alert">${message}</div>`);
}

function clearError($field) {
    $field.removeClass('error');
    $field.siblings('.error-message').remove();
}

// 🎯 새로 추가된 유틸리티 함수들
function resetForm($form) {
    $form[0].reset();
    $form.find('.input-group').removeClass('error');
    $form.find('input, textarea').removeClass('error');
    $form.find('.error-message').text('');
}

function showSuccessMessage(data) {
    const message = `전송이 완료되었습니다!\n\n이름: ${data.name}\n전화번호: ${data.phone}\n이메일: ${data.email}`;
    alert(`✅ ${message}`);
}