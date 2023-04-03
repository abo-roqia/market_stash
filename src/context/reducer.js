import { GET_CATS_VAR, ADD_CAT_VAR, DELETE_CAT_VAR, UPDATE_CAT_VAR } from "constants/";
import { GET_PRODS_VAR, ADD_PROD_VAR, DELETE_PROD_VAR, UPDATE_PROD_VAR } from "constants/";
import { GET_CATAGORIES, ADD_CATAGORY, UPDATE_CATAGORY, DELETE_CATAGORY } from "utilities";
import { GET_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from "utilities";

// We Must To Use Asyncronnouse Becouse Async Function Return A Promise
const Reducer = async (states, { type, payload: { body, showAlert = false, closeWidget: close = false, ...payload } }) => {
	let state = await states;
	let { catagory, product, updated } = body || {};

	setTimeout(() => {
		close && close();
		showAlert && showAlert("pending", "");
	}, 2000);

	try {
		showAlert && showAlert("warning", "انتظر قليلاً");
		switch (type) {
			// ========================================== [Catagories] ===========================================
			case GET_CATS_VAR:
				let catRes = await GET_CATAGORIES();
				if (catRes.request.status !== 200) payload.setLoading({ msg: "حدث خطأ في قاعدة البيانات", state: "error" });
				state.catagories = catRes.data;
				return state;

			case ADD_CAT_VAR:
				await ADD_CATAGORY(body);
				let newCatRes = await GET_CATAGORIES();
				if (newCatRes.request.status !== 200) payload.setLoading({ msg: "حدث خطأ في قاعدة البيانات", state: "error" });
				state.catagories = newCatRes.data;
				setTimeout(() => showAlert && showAlert("success", "لقد تم اضافة البيانات"), 500);
				return state;

			case UPDATE_CAT_VAR:
				updated && state.catagories.push({ ...catagory, ...updated });
				state.catagories = state.catagories.filter((item) => item !== catagory) || state.catagories;
				await UPDATE_CATAGORY(catagory._id, updated);
				setTimeout(() => showAlert && showAlert("success", "لقد تم تعديل البيانات"), 500);
				return state;

			case DELETE_CAT_VAR:
				state.catagories = state.catagories.filter((item) => item !== catagory) || state.catagories;
				await DELETE_CATAGORY(catagory._id);
				setTimeout(() => showAlert && showAlert("success", "لقد تم حذف البيانات"), 500);
				return state;

			// ========================================== [Products] =============================================
			case GET_PRODS_VAR:
				let prodRes = await GET_PRODUCTS();
				if (prodRes.request.status !== 200) payload.setLoading({ msg: "حدث خطأ في قاعدة البيانات", state: "error" });
				state.products = prodRes.data;
				return state;

			case ADD_PROD_VAR:
				await ADD_PRODUCT(body);
				let newProdRes = await GET_PRODUCTS();
				if (newProdRes.request.status !== 200) payload.setLoading({ msg: "حدث خطأ في قاعدة البيانات", state: "error" });
				state.products = newProdRes.data;
				setTimeout(() => showAlert && showAlert("success", "لقد تم اضافة البيانات"), 500);
				return state;

			case UPDATE_PROD_VAR:
				body.newType && (product.type = body.newType);

				// Delete/Replace The Old Kind With The New Kind
				if (body.newKind) {
					let cloned = product.branches[body.oldKind];
					product.branches[body.newKind] = cloned;
					delete product.branches[body.oldKind];
				}
				// Just Delete The Old Kind
				else if (!body.newKind && body.oldKind) {
					delete product.branches[body.oldKind];
				}

				await UPDATE_PRODUCT(product._id, product);
				setTimeout(() => showAlert && showAlert("success", "لقد تم تعديل البيانات"), 500);
				return state;

			case DELETE_PROD_VAR:
				state.products = state.products.filter((item) => item !== product) || state.products;
				await DELETE_PRODUCT(product._id);
				setTimeout(() => showAlert && showAlert("success", "لقد تم حذف البيانات"), 500);
				return state;

			default:
				return state;
		}
	} catch (error) {
		showAlert && showAlert("error", error.message || "لقد حدث خطأ");
	}
};

export default Reducer;
