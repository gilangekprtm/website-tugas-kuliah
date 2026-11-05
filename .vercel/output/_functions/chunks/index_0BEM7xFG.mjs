import { t as __exportAll } from "./rolldown-runtime_D8jQpDG7.mjs";
import { t as createAstro } from "./compiler_uQX-6SpM.mjs";
import { h as InvalidComponentArgs, q as AstroError } from "./errors-data_Bh25UsU2.mjs";
import { c as renderTemplate, h as addAttribute, l as renderHead, u as createRenderInstruction } from "./server_Bgh1_v_Z.mjs";
import { createClient } from "@supabase/supabase-js";
// ../node_modules/astro/dist/runtime/server/astro-component.js
function validateArgs(args) {
	if (args.length !== 3) return false;
	if (!args[0] || typeof args[0] !== "object") return false;
	return true;
}
function baseCreateComponent(cb, moduleId, propagation) {
	const name = moduleId?.split("/").pop()?.replace(".astro", "") ?? "";
	const fn = (...args) => {
		if (!validateArgs(args)) throw new AstroError({
			...InvalidComponentArgs,
			message: InvalidComponentArgs.message(name)
		});
		return cb(...args);
	};
	Object.defineProperty(fn, "name", {
		value: name,
		writable: false
	});
	fn.isAstroComponentFactory = true;
	fn.moduleId = moduleId;
	fn.propagation = propagation;
	return fn;
}
function createComponentWithOptions(opts) {
	return baseCreateComponent(opts.factory, opts.moduleId, opts.propagation);
}
function createComponent(arg1, moduleId, propagation) {
	if (typeof arg1 === "function") return baseCreateComponent(arg1, moduleId, propagation);
	else return createComponentWithOptions(arg1);
}
// ../node_modules/astro/dist/runtime/server/render/script.js
/**
* Relies on the `renderScript: true` compiler option
* @experimental
*/
async function renderScript(result, id) {
	const inlined = result.inlinedScripts.get(id);
	let content = "";
	if (inlined != null) {
		if (inlined) content = `<script type="module">${inlined}<\/script>`;
	} else {
		const resolved = await result.resolve(id);
		content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"><\/script>`;
	}
	return createRenderInstruction({
		type: "script",
		id,
		content
	});
}
// src/lib/supabase.js
var supabaseUrl = void 0;
var supabasePublishableKey = void 0;
var missingVariables = [["PUBLIC_SUPABASE_URL", supabaseUrl], ["PUBLIC_SUPABASE_PUBLISHABLE_KEY", supabasePublishableKey]].filter(([, value]) => !value?.trim()).map(([name]) => name);
if (missingVariables.length > 0) throw new Error(`Missing Supabase environment variable(s): ${missingVariables.join(", ")}. Copy .env.example to .env in the project root, fill in your Supabase project URL and publishable key, then restart Astro.`);
var supabase = createClient(supabaseUrl, supabasePublishableKey);
// src/pages/index.astro
var pages_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	url: () => ""
});
createAstro("https://astro.build");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const daftarMataKuliah = [
		"BAHASA INGGRIS TUJUAN KHUSUS",
		"TRANSFORMATOR",
		"ELEKTRONIKA DAYA",
		"INSTALASI LISTRIK KOMERSIAL",
		"TRANSMISI TENAGA LISTRIK",
		"DISTRIBUSI TENAGA LISTRIK",
		"PEMBANGKIT TENAGA LISTRIK",
		"MESIN LISTRIK",
		"INSTRUMENTASI DAN KENDALI",
		"PRAKTIK RANGKAIAN LISTRIK",
		"PRAKTIK INSTALASI LISTRIK RESIDENSIAL"
	];
	if (Astro.request.method === "POST") {
		const formData = await Astro.request.formData();
		const action = formData.get("_action");
		if (action === "create") {
			const judul = formData.get("judul");
			const mata_kuliah = formData.get("mata_kuliah");
			const tenggat_waktu = formData.get("tenggat_waktu");
			const prioritas = formData.get("prioritas");
			const catatan = formData.get("catatan");
			await supabase.from("tugas_kuliah").insert([{
				judul,
				mata_kuliah,
				tenggat_waktu,
				prioritas,
				catatan,
				status: "Belum Selesai"
			}]);
		} else if (action === "delete") {
			const id = formData.get("id");
			await supabase.from("tugas_kuliah").delete().eq("id", id);
		} else if (action === "update_status") {
			const id = formData.get("id");
			const status = formData.get("status");
			await supabase.from("tugas_kuliah").update({ status }).eq("id", id);
		}
	}
	const { data, error } = await supabase.from("tugas_kuliah").select("*").order("tenggat_waktu", { ascending: true });
	const daftarTugas = data || [];
	const totalTugas = daftarTugas.length;
	const belumSelesai = daftarTugas.filter((t) => t.status === "Belum Selesai").length;
	const dalamProses = daftarTugas.filter((t) => t.status === "Dalam Proses").length;
	const selesai = daftarTugas.filter((t) => t.status === "Selesai").length;
	return renderTemplate`<html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Manajemen Tugas Kuliah</title>${renderHead($$result)}</head><body class="bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors duration-200"><div class="max-w-5xl mx-auto px-4 py-8"><!-- Header --><header class="flex justify-between items-center mb-8"><h1 class="text-2xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2"><!-- Logo Cap/Graduation SVG Inline --><svg class="w-8 h-8 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147L12 14.6l7.74-4.453M12 4.5L2.25 10.125 12 15.75l9.75-5.625L12 4.5z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M6 12.75v4.5A2.25 2.25 0 008.25 19.5h7.5A2.25 2.25 0 0018 17.25v-4.5"></path></svg>TugasKuliah</h1><div class="flex gap-2"><button id="themeToggle" class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-all"><!-- Sun/Moon SVG --><svg id="themeIcon" class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 3a9 9 0 109 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 01-4.4 2.26 5.403 5.403 0 01-5.4-5.4c0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"></path></svg></button><button id="openModalBtn" class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl font-semibold shadow-sm transition-all"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>Tambah Tugas</button></div></header><!-- Dashboard Stats --><section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"><div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4 shadow-sm"><div class="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm0 5.25h.007v.008H3.75V12zm0 5.25h.007v.008H3.75v-.008z"></path></svg></div><div><p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Total Tugas</p><p class="text-2xl font-bold">${totalTugas}</p></div></div><div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4 shadow-sm"><div class="w-12 h-12 rounded-xl bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400 flex items-center justify-center"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Belum Selesai</p><p class="text-2xl font-bold">${belumSelesai}</p></div></div><div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4 shadow-sm"><div class="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"></path></svg></div><div><p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Dalam Proses</p><p class="text-2xl font-bold">${dalamProses}</p></div></div><div class="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center gap-4 shadow-sm"><div class="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div><div><p class="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Selesai</p><p class="text-2xl font-bold">${selesai}</p></div></div></section><!-- Filter Controls --><section class="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 mb-8 flex flex-wrap gap-4 items-center justify-between shadow-sm"><div class="relative flex-1 min-w-[240px]"><svg class="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path></svg><input type="text" id="searchInput" placeholder="Cari tugas atau mata kuliah..." class="w-full pl-11 pr-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"></div><div class="flex gap-2 w-full sm:w-auto"><select id="filterStatus" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm flex-1 sm:flex-none"><option value="all">Semua Status</option><option value="Belum Selesai">Belum Selesai</option><option value="Dalam Proses">Dalam Proses</option><option value="Selesai">Selesai</option></select><select id="filterPrioritas" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm flex-1 sm:flex-none"><option value="all">Semua Prioritas</option><option value="Tinggi">Tinggi</option><option value="Sedang">Sedang</option><option value="Rendah">Rendah</option></select></div></section><!-- Task Items List --><main class="space-y-4" id="taskList">${daftarTugas.length === 0 ? renderTemplate`<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-12 text-center shadow-sm"><svg class="w-16 h-16 mx-auto mb-4 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"></path></svg><h3 class="text-lg font-bold text-slate-700 dark:text-slate-200">Belum Ada Tugas</h3><p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Klik tombol <strong>Tambah Tugas</strong> untuk mencatat tugas kuliah pertama Anda.</p></div>` : daftarTugas.map((tugas) => {
		const priorityBorder = tugas.prioritas === "Tinggi" ? "border-l-red-500" : tugas.prioritas === "Sedang" ? "border-l-amber-500" : "border-l-emerald-500";
		const priorityBadge = tugas.prioritas === "Tinggi" ? "bg-red-50 text-red-600 dark:bg-red-950/40 dark:text-red-400" : tugas.prioritas === "Sedang" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400";
		return renderTemplate`<div${addAttribute(`task-card bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 border-l-4 ${priorityBorder} flex flex-col sm:flex-row justify-between sm:items-center gap-4 shadow-sm`, "class")}${addAttribute(tugas.judul?.toLowerCase() || "", "data-judul")}${addAttribute(tugas.mata_kuliah?.toLowerCase() || "", "data-matkul")}${addAttribute(tugas.status, "data-status")}${addAttribute(tugas.prioritas, "data-prioritas")}><div><h3 class="font-bold text-lg">${tugas.judul}</h3><div class="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1.5"><span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25"></path></svg> ${tugas.mata_kuliah}</span><span class="flex items-center gap-1"><svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"></path></svg> ${new Date(tugas.tenggat_waktu).toLocaleString("id-ID", {
			dateStyle: "medium",
			timeStyle: "short"
		})}</span><span${addAttribute(`px-2.5 py-0.5 rounded-full font-semibold ${priorityBadge}`, "class")}>${tugas.prioritas}</span></div>${tugas.catatan && renderTemplate`<p class="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1"><svg class="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"></path></svg> ${tugas.catatan}</p>`}</div><div class="flex items-center gap-3"><form method="POST" class="m-0"><input type="hidden" name="_action" value="update_status"><input type="hidden" name="id"${addAttribute(tugas.id, "value")}><select name="status" class="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer" onchange="this.form.submit()"><option value="Belum Selesai"${addAttribute(tugas.status === "Belum Selesai", "selected")}>Belum Selesai</option><option value="Dalam Proses"${addAttribute(tugas.status === "Dalam Proses", "selected")}>Dalam Proses</option><option value="Selesai"${addAttribute(tugas.status === "Selesai", "selected")}>Selesai</option></select></form><form method="POST" class="m-0" onsubmit="return confirm('Apakah Anda yakin ingin menghapus tugas ini?');"><input type="hidden" name="_action" value="delete"><input type="hidden" name="id"${addAttribute(tugas.id, "value")}><button type="submit" class="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-lg transition-colors"><svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path></svg></button></form></div></div>`;
	})}</main></div><!-- Modal Form Tambah Tugas --><div id="taskModal" class="fixed inset-0 bg-slate-900/50 backdrop-blur-sm hidden items-center justify-center p-4 z-50"><div class="bg-white dark:bg-slate-800 w-full max-w-lg rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-xl"><div class="flex justify-between items-center mb-6"><h3 class="text-lg font-bold">Tambah Tugas Baru</h3><button id="closeModalBtn" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"><svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg></button></div><form method="POST" class="space-y-4"><input type="hidden" name="_action" value="create"><div><label for="judul" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Judul Tugas</label><input type="text" id="judul" name="judul" placeholder="Contoh: Laporan Praktikum Pemrograman" required class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div><div class="grid grid-cols-1 sm:grid-cols-2 gap-4"><div><label for="mata_kuliah" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Mata Kuliah</label><select id="mata_kuliah" name="mata_kuliah" required class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="" disabled selected>-- Pilih Mata Kuliah --</option>${daftarMataKuliah.map((matkul) => renderTemplate`<option${addAttribute(matkul, "value")}>${matkul}</option>`)}</select></div><div><label for="prioritas" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Prioritas</label><select id="prioritas" name="prioritas" class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"><option value="Tinggi">Tinggi</option><option value="Sedang" selected>Sedang</option><option value="Rendah">Rendah</option></select></div></div><div><label for="tenggat_waktu" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Tenggat Waktu</label><input type="datetime-local" id="tenggat_waktu" name="tenggat_waktu" required class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></div><div><label for="catatan" class="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Catatan (Opsional)</label><textarea id="catatan" name="catatan" rows="3" placeholder="Detail instruksi tugas..." class="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea></div><div class="flex justify-end gap-3 pt-4"><button type="button" id="cancelModalBtn" class="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-700">Batal</button><button type="submit" class="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold">Simpan Tugas</button></div></form></div></div><!-- Client-side Logic (Dark Mode, Modal, Instant Filter) -->${renderScript($$result, "D:/Documents/KULIAH/website-tugas-kuliah/website-tugas-kuliah/src/pages/index.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "D:/Documents/KULIAH/website-tugas-kuliah/website-tugas-kuliah/src/pages/index.astro", void 0);
var $$file = "D:/Documents/KULIAH/website-tugas-kuliah/website-tugas-kuliah/src/pages/index.astro";
// \0virtual:astro:page:src/pages/index@_@astro
var page = () => pages_exports;
export { page };
