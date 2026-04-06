document.addEventListener("DOMContentLoaded", function () {
	var circles = document.querySelectorAll(".hero-img .tool-orb");
	var phoneRingBtn = document.getElementById("phoneRingBtn");
	var revealSections = document.querySelectorAll(".reveal-on-scroll");
	var navHome = document.getElementById("navHome");
	var navServices = document.getElementById("navServices");
	var navAbout = document.getElementById("navAbout");
	var navFacilities = document.getElementById("navFacilities");
	var navContact = document.getElementById("navContact");
	var navFaq = document.getElementById("navFaq");
	var servicesAnchorSection = document.getElementById("our-services");
	var aboutAnchorSection = document.getElementById("about-us");
	var webDevelopmentSection = document.getElementById("web-development");
	var mobileAppSection = document.getElementById("mobile-app");
	var posterDesignSection = document.getElementById("poster-design");
	var facilitiesAnchorSection = document.getElementById("facilities");
	var contactAnchorSection = document.getElementById("contact-us");
	var faqAnchorSection = document.getElementById("faqs");
	var facilityCards = document.querySelectorAll(".facility-card");
	var facilitiesTrack = document.querySelector(".facilities-track");
	var facilitiesDirLeftBtn = document.getElementById("facilitiesDirLeft");
	var facilitiesDirRightBtn = document.getElementById("facilitiesDirRight");
	var facilityModal = document.getElementById("facilityModal");
	var facilityModalImg = document.getElementById("facilityModalImg");
	var facilityModalTitle = document.getElementById("facilityModalTitle");
	var facilityModalDesc = document.getElementById("facilityModalDesc");
	var facilityModalCloseItems = document.querySelectorAll("[data-modal-close]");
	var logoProjectsGrid = document.querySelector(".logo-projects-grid");
	var ringIntervalId;
	var ringTimeoutId;
	var logoShuffleIntervalId;

	circles.forEach(function (circle, index) {
		setTimeout(function () {
			circle.classList.add("is-animate");
		}, index * 120);
	});

	if (revealSections.length) {
		if ("IntersectionObserver" in window) {
			var revealObserver = new IntersectionObserver(
				function (entries) {
					entries.forEach(function (entry) {
						if (!entry.isIntersecting) {
							return;
						}

						entry.target.classList.add("is-visible");
						revealObserver.unobserve(entry.target);
					});
				},
				{ threshold: 0.22 }
			);

			revealSections.forEach(function (section) {
				revealObserver.observe(section);
			});
		} else {
			revealSections.forEach(function (section) {
				section.classList.add("is-visible");
			});
		}
	}

	function shuffleLogoProjectCards() {
		if (!logoProjectsGrid) {
			return;
		}

		var cards = Array.prototype.slice.call(logoProjectsGrid.children);
		if (cards.length < 2) {
			return;
		}

		var firstRects = new Map();
		cards.forEach(function (card) {
			firstRects.set(card, card.getBoundingClientRect());
		});

		for (var i = cards.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = cards[i];
			cards[i] = cards[j];
			cards[j] = temp;
		}

		cards.forEach(function (card) {
			logoProjectsGrid.appendChild(card);
		});

		cards.forEach(function (card) {
			var firstRect = firstRects.get(card);
			var lastRect = card.getBoundingClientRect();
			var dx = firstRect.left - lastRect.left;
			var dy = firstRect.top - lastRect.top;

			card.style.transition = "none";
			card.style.transform = "translate(" + dx + "px," + dy + "px)";
		});

		void logoProjectsGrid.offsetWidth;

		cards.forEach(function (card) {
			card.style.transition = "transform .72s cubic-bezier(.22,.78,.2,1)";
			card.style.transform = "";
			setTimeout(function () {
				card.style.transition = "";
			}, 760);
		});
	}

	function startLogoShuffle() {
		if (!logoProjectsGrid) {
			return;
		}

		if (logoShuffleIntervalId) {
			return;
		}

		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		logoShuffleIntervalId = setInterval(shuffleLogoProjectCards, 2800);
	}

	function stopLogoShuffle() {
		if (logoShuffleIntervalId) {
			clearInterval(logoShuffleIntervalId);
			logoShuffleIntervalId = null;
		}
	}

	if (logoProjectsGrid) {
		startLogoShuffle();

		logoProjectsGrid.addEventListener("mouseenter", stopLogoShuffle);
		logoProjectsGrid.addEventListener("mouseleave", startLogoShuffle);

		document.addEventListener("visibilitychange", function () {
			if (document.hidden) {
				stopLogoShuffle();
			} else {
				startLogoShuffle();
			}
		});
	}

	function setActiveNav(target) {
		if (navHome) {
			navHome.classList.remove("active");
		}
		if (navServices) {
			navServices.classList.remove("active");
		}
		if (navAbout) {
			navAbout.classList.remove("active");
		}
		if (navFacilities) {
			navFacilities.classList.remove("active");
		}
		if (navContact) {
			navContact.classList.remove("active");
		}
		if (navFaq) {
			navFaq.classList.remove("active");
		}

		if (target) {
			target.classList.add("active");
		}
	}

	var navLockUntil = 0;
	var navScrollTicking = false;

	function updateHeaderActiveState() {
		if (!navHome || !navServices || !servicesAnchorSection) {
			return;
		}

		var stickyOffset = 170;
		var scrollProbe = window.scrollY + stickyOffset;
		var servicesStart =
			servicesAnchorSection.getBoundingClientRect().top + window.scrollY;
		var aboutStart = aboutAnchorSection
			? aboutAnchorSection.getBoundingClientRect().top + window.scrollY - 40
			: Number.POSITIVE_INFINITY;
		var webDevelopmentStart = webDevelopmentSection
			? webDevelopmentSection.getBoundingClientRect().top + window.scrollY - 40
			: Number.POSITIVE_INFINITY;
		var mobileAppStart = mobileAppSection
			? mobileAppSection.getBoundingClientRect().top + window.scrollY - 40
			: Number.POSITIVE_INFINITY;
		var posterDesignStart = posterDesignSection
			? posterDesignSection.getBoundingClientRect().top + window.scrollY - 40
			: Number.POSITIVE_INFINITY;
		var facilitiesStart = facilitiesAnchorSection
			? facilitiesAnchorSection.getBoundingClientRect().top + window.scrollY - 60
			: Number.POSITIVE_INFINITY;
		var contactStart = contactAnchorSection
			? contactAnchorSection.getBoundingClientRect().top + window.scrollY - 80
			: Number.POSITIVE_INFINITY;
		var faqStart = faqAnchorSection
			? faqAnchorSection.getBoundingClientRect().top + window.scrollY - 80
			: Number.POSITIVE_INFINITY;

		if (scrollProbe >= faqStart && navFaq) {
			setActiveNav(navFaq);
		} else if (scrollProbe >= contactStart && navContact) {
			setActiveNav(navContact);
		} else if (scrollProbe >= facilitiesStart && navFacilities) {
			setActiveNav(navFacilities);
		} else if (scrollProbe >= aboutStart && navAbout) {
			setActiveNav(navAbout);
		} else if (scrollProbe >= servicesStart) {
			setActiveNav(navServices);
		} else {
			setActiveNav(navHome);
		}

		if (
			webDevelopmentSection &&
			scrollProbe >= webDevelopmentStart &&
			scrollProbe < mobileAppStart
		) {
			document.body.classList.add("webfolio-nav-highlight");
		} else {
			document.body.classList.remove("webfolio-nav-highlight");
		}

		if (
			mobileAppSection &&
			scrollProbe >= mobileAppStart &&
			scrollProbe < posterDesignStart
		) {
			document.body.classList.add("molar-nav-highlight");
		} else {
			document.body.classList.remove("molar-nav-highlight");
		}

		if (
			posterDesignSection &&
			scrollProbe >= posterDesignStart &&
			scrollProbe < facilitiesStart
		) {
			document.body.classList.add("poster-nav-highlight");
		} else {
			document.body.classList.remove("poster-nav-highlight");
		}
	}

	function onNavScroll() {
		if (Date.now() < navLockUntil) {
			return;
		}

		if (navScrollTicking) {
			return;
		}

		navScrollTicking = true;
		window.requestAnimationFrame(function () {
			navScrollTicking = false;
			updateHeaderActiveState();
		});
	}

	function lockAndSetActive(target) {
		setActiveNav(target);
		navLockUntil = Date.now() + 900;
	}

	if (navHome) {
		navHome.addEventListener("click", function () {
			lockAndSetActive(navHome);
		});
	}

	if (navServices) {
		navServices.addEventListener("click", function () {
			lockAndSetActive(navServices);
		});
	}

	if (navAbout) {
		navAbout.addEventListener("click", function () {
			lockAndSetActive(navAbout);
		});
	}

	if (navFacilities) {
		navFacilities.addEventListener("click", function () {
			lockAndSetActive(navFacilities);
		});
	}

	if (navContact) {
		navContact.addEventListener("click", function () {
			lockAndSetActive(navContact);
		});
	}

	if (navFaq) {
		navFaq.addEventListener("click", function () {
			lockAndSetActive(navFaq);
		});
	}

	window.addEventListener("scroll", onNavScroll);
	window.addEventListener("resize", updateHeaderActiveState);
	updateHeaderActiveState();

	function setFacilitiesDirection(direction) {
		if (!facilitiesTrack) {
			return;
		}

		var isRight = direction === "right";
		facilitiesTrack.classList.toggle("is-reverse", isRight);

		if (facilitiesDirLeftBtn) {
			facilitiesDirLeftBtn.classList.toggle("is-active", !isRight);
			facilitiesDirLeftBtn.setAttribute("aria-pressed", (!isRight).toString());
		}

		if (facilitiesDirRightBtn) {
			facilitiesDirRightBtn.classList.toggle("is-active", isRight);
			facilitiesDirRightBtn.setAttribute("aria-pressed", isRight.toString());
		}
	}

	if (facilitiesDirLeftBtn) {
		facilitiesDirLeftBtn.addEventListener("click", function () {
			setFacilitiesDirection("left");
		});
	}

	if (facilitiesDirRightBtn) {
		facilitiesDirRightBtn.addEventListener("click", function () {
			setFacilitiesDirection("right");
		});
	}

	setFacilitiesDirection("left");

	function openFacilityModal(card) {
		if (!facilityModal || !facilityModalImg || !facilityModalTitle || !facilityModalDesc) {
			return;
		}

		var title = card.getAttribute("data-title") || "Facility";
		var image = card.getAttribute("data-image") || "";
		var description = card.getAttribute("data-description") || "";

		facilityModalImg.setAttribute("src", image);
		facilityModalImg.setAttribute("alt", title);
		facilityModalTitle.textContent = title;
		facilityModalDesc.textContent = description;

		facilityModal.classList.add("is-open");
		facilityModal.setAttribute("aria-hidden", "false");
		document.body.classList.add("modal-open");
	}

	function closeFacilityModal() {
		if (!facilityModal) {
			return;
		}

		facilityModal.classList.remove("is-open");
		facilityModal.setAttribute("aria-hidden", "true");
		document.body.classList.remove("modal-open");
	}

	facilityCards.forEach(function (card) {
		card.addEventListener("click", function () {
			openFacilityModal(card);
		});
	});

	facilityModalCloseItems.forEach(function (item) {
		item.addEventListener("click", closeFacilityModal);
	});

	document.addEventListener("keydown", function (event) {
		if (event.key === "Escape") {
			closeFacilityModal();
		}
	});

	// HELLO typing animation — 5 cycling fonts
	var helloTextEl = document.querySelector('.about-hello-text');
	var helloEl = document.querySelector('.about-hello');

	if (helloTextEl && helloEl) {
		var helloFonts = [
			{ family: "'Bebas Neue', sans-serif", spacing: "0.06em" },
			{ family: "'Permanent Marker', cursive", spacing: "0.02em" },
			{ family: "'Abril Fatface', serif", spacing: "0.03em" },
			{ family: "'Great Vibes', cursive", spacing: "0.01em" },
			{ family: "'Playfair Display', serif", spacing: "0.04em" },
			{ family: "'Pacifico', cursive", spacing: "0.02em" },
			{ family: "'Dancing Script', cursive", spacing: "0.02em" }
		];
		var helloWord = 'HELLO';
		var helloFontIdx = 0;
		var helloCharIdx = 0;
		var helloDeleting = false;
		var HELLO_TYPE_SPEED   = 110;
		var HELLO_DELETE_SPEED = 70;
		var HELLO_PAUSE_AFTER  = 1800;
		var HELLO_PAUSE_NEXT   = 380;

		helloTextEl.style.display = "inline-block";
		helloTextEl.style.whiteSpace = "nowrap";

		var helloReserve = document.createElement("span");
		helloReserve.style.position = "absolute";
		helloReserve.style.visibility = "hidden";
		helloReserve.style.whiteSpace = "nowrap";
		helloReserve.textContent = helloWord;
		document.body.appendChild(helloReserve);

		var maxHelloWidth = 0;
		var maxHelloHeight = 0;

		helloFonts.forEach(function (fontConfig) {
			helloReserve.style.fontFamily = fontConfig.family;
			helloReserve.style.fontSize = window.getComputedStyle(helloEl).fontSize;
			helloReserve.style.letterSpacing = fontConfig.spacing;

			maxHelloWidth = Math.max(maxHelloWidth, Math.ceil(helloReserve.getBoundingClientRect().width));
			maxHelloHeight = Math.max(maxHelloHeight, Math.ceil(helloReserve.getBoundingClientRect().height));
		});

		document.body.removeChild(helloReserve);
		helloEl.style.minWidth = maxHelloWidth + "px";
		helloEl.style.minHeight = maxHelloHeight + "px";

		function tickHello() {
			helloEl.style.fontFamily = helloFonts[helloFontIdx].family;
			helloEl.style.letterSpacing = helloFonts[helloFontIdx].spacing;
			if (!helloDeleting) {
				helloCharIdx++;
				helloTextEl.textContent = helloWord.slice(0, helloCharIdx);
				if (helloCharIdx === helloWord.length) {
					helloDeleting = true;
					setTimeout(tickHello, HELLO_PAUSE_AFTER);
					return;
				}
				setTimeout(tickHello, HELLO_TYPE_SPEED);
			} else {
				helloCharIdx--;
				helloTextEl.textContent = helloWord.slice(0, helloCharIdx);
				if (helloCharIdx === 0) {
					helloDeleting = false;
					helloFontIdx = (helloFontIdx + 1) % helloFonts.length;
					setTimeout(tickHello, HELLO_PAUSE_NEXT);
					return;
				}
				setTimeout(tickHello, HELLO_DELETE_SPEED);
			}
		}

		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(function () {
				setTimeout(tickHello, 500);
			});
		} else {
			setTimeout(tickHello, 500);
		}
	}

	function initCertificatesCarousel() {
		var carouselTrack = document.getElementById("certificatesCarouselTrack");
		if (!carouselTrack) {
			return;
		}

		var viewport = carouselTrack.parentElement;
		if (!viewport) {
			return;
		}

		var baseItems = Array.prototype.slice.call(
			carouselTrack.querySelectorAll(".cert-carousel-item")
		);

		if (baseItems.length < 2) {
			return;
		}

		baseItems.forEach(function (item) {
			var clone = item.cloneNode(true);
			clone.setAttribute("aria-hidden", "true");
			carouselTrack.appendChild(clone);
		});

		var clonedItems = Array.prototype.slice.call(
			carouselTrack.querySelectorAll(".cert-carousel-item")
		);

		var rafId = null;
		var previousTick = 0;
		var loopWidth = 0;
		var speedPxPer16ms = 0.52;
		var certModal = document.getElementById("certModal");
		var certModalImg = document.getElementById("certModalImg");
		var certModalCaption = document.getElementById("certModalCaption");
		var certModalClose = document.getElementById("certModalClose");

		function openCertModal(sourceImg) {
			if (!certModal || !certModalImg || !sourceImg) {
				return;
			}

			certModalImg.setAttribute("src", sourceImg.getAttribute("src") || "");
			certModalImg.setAttribute("alt", sourceImg.getAttribute("alt") || "Certificate preview");
			if (certModalCaption) {
				certModalCaption.textContent = sourceImg.getAttribute("alt") || "Certificate";
			}

			certModal.classList.add("is-open");
			certModal.setAttribute("aria-hidden", "false");
			document.body.classList.add("cert-modal-open");
		}

		function closeCertModal() {
			if (!certModal) {
				return;
			}

			certModal.classList.remove("is-open");
			certModal.setAttribute("aria-hidden", "true");
			document.body.classList.remove("cert-modal-open");
		}

		carouselTrack.addEventListener("click", function (event) {
			var image = event.target.closest(".cert-carousel-item img");
			if (!image) {
				return;
			}

			openCertModal(image);
		});

		if (certModalClose) {
			certModalClose.addEventListener("click", closeCertModal);
		}

		if (certModal) {
			certModal.addEventListener("click", function (event) {
				if (event.target === certModal) {
					closeCertModal();
				}
			});
		}

		document.addEventListener("keydown", function (event) {
			if (event.key === "Escape") {
				closeCertModal();
			}
		});

		function updateLoopWidth() {
			if (carouselTrack.children.length <= baseItems.length) {
				loopWidth = 0;
				return;
			}

			var firstNode = carouselTrack.children[0];
			var firstCloneNode = carouselTrack.children[baseItems.length];
			loopWidth = firstCloneNode.offsetLeft - firstNode.offsetLeft;
		}

		function updateFocusScales() {
			var viewportRect = viewport.getBoundingClientRect();
			var centerX = viewportRect.left + viewportRect.width / 2;
			var maxDistance = Math.max(viewportRect.width * 0.6, 1);
			var nearestCard = null;
			var nearestDistance = Number.POSITIVE_INFINITY;

			clonedItems.forEach(function (card) {
				var cardRect = card.getBoundingClientRect();
				var cardCenter = cardRect.left + cardRect.width / 2;
				var distance = Math.abs(cardCenter - centerX);
				var normalized = Math.min(distance / maxDistance, 1);
				var scale = 1.08 - normalized * 0.24;
				var opacity = 1 - normalized * 0.4;

				card.style.setProperty("--focus-scale", scale.toFixed(3));
				card.style.setProperty("--focus-opacity", opacity.toFixed(3));
				card.classList.remove("is-focus");

				if (distance < nearestDistance) {
					nearestDistance = distance;
					nearestCard = card;
				}
			});

			if (nearestCard) {
				nearestCard.classList.add("is-focus");
			}
		}

		function animateCarousel(timestamp) {
			if (!previousTick) {
				previousTick = timestamp;
			}

			var delta = timestamp - previousTick;
			previousTick = timestamp;

			if (!document.hidden && loopWidth > 0) {
				carouselTrack.scrollLeft += speedPxPer16ms * (delta / 16.67);

				if (carouselTrack.scrollLeft >= loopWidth) {
					carouselTrack.scrollLeft -= loopWidth;
				}
			}

			updateFocusScales();
			rafId = window.requestAnimationFrame(animateCarousel);
		}

		viewport.addEventListener("scroll", updateFocusScales, { passive: true });

		window.addEventListener("resize", function () {
			updateLoopWidth();
			updateFocusScales();
		});

		updateLoopWidth();
		updateFocusScales();
		rafId = window.requestAnimationFrame(animateCarousel);

		document.addEventListener("visibilitychange", function () {
			if (!document.hidden) {
				previousTick = 0;
			}
		});
	}

	initCertificatesCarousel();

	// Best-effort content protection (deterrent only, not absolute security)
	document.body.classList.add("content-protected");

	document.querySelectorAll("img").forEach(function (image) {
		image.setAttribute("draggable", "false");
	});

	document.addEventListener("contextmenu", function (event) {
		event.preventDefault();
	});

	document.addEventListener("dragstart", function (event) {
		var target = event.target;
		if (target && target.tagName === "IMG") {
			event.preventDefault();
		}
	});

	document.addEventListener("copy", function (event) {
		event.preventDefault();
	});

	document.addEventListener("cut", function (event) {
		event.preventDefault();
	});

	document.addEventListener("selectstart", function (event) {
		var target = event.target;
		if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) {
			return;
		}

		event.preventDefault();
	});

	document.addEventListener("keydown", function (event) {
		var key = event.key.toLowerCase();
		var isMod = event.ctrlKey || event.metaKey;

		if (isMod && (key === "c" || key === "x" || key === "s" || key === "u" || key === "p")) {
			event.preventDefault();
			return;
		}

		if (isMod && event.shiftKey && (key === "i" || key === "j" || key === "c")) {
			event.preventDefault();
			return;
		}

		if (key === "f12") {
			event.preventDefault();
		}
	});

	

	if (!phoneRingBtn) {
		return;
	}

	// Back to top button
	var backToTopBtn = document.getElementById("backToTop");

	if (backToTopBtn) {
		window.addEventListener("scroll", function () {
			if (window.scrollY > 320) {
				backToTopBtn.classList.add("show");
			} else {
				backToTopBtn.classList.remove("show");
			}
		});

		backToTopBtn.addEventListener("click", function () {
			window.scrollTo({ top: 0, behavior: "smooth" });
		});
	}

	function triggerRing() {
		phoneRingBtn.classList.remove("ringing");
		void phoneRingBtn.offsetWidth;
		phoneRingBtn.classList.add("ringing");

		ringTimeoutId = setTimeout(function () {
			phoneRingBtn.classList.remove("ringing");
		}, 950);
	}

	triggerRing();
	ringIntervalId = setInterval(triggerRing, 4000);

	phoneRingBtn.addEventListener("click", function () {
		clearInterval(ringIntervalId);
		clearTimeout(ringTimeoutId);
		phoneRingBtn.classList.remove("ringing");
	});
});
