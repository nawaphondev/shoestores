import axios from "axios";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import thaiProvince from "../../lib/thai_province.json";
import thaiDistrict from "../../lib/thai_district.json";
import thaiSubdistrict from "../../lib/thai_subdistrict.json";
import { useQueryClient } from "@tanstack/react-query";

const formSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณาระบุชื่อผู้รับ" }),
  lastName: z.string().min(1, { message: "กรุณาระบุนามสกุลผู้รับ" }),
  email: z.string().min(1, { message: "กรุณาระบุอีเมล" }).email(),
  phoneNumber: z
    .string()
    .max(10, "กรุณาระบุหมายเลขโทรศัพท์")
    .min(10, { message: "กรุณาระบุหมายเลขโทรศัพท์ให้ถูกต้อง" }),
  address: z.string().min(3, { message: "กรุณาระบุที่อยู่ในการจัดส่ง" }),
  postalCode: z
    .string()
    .max(5, "กรุณาระบุรหัสไปรษณีย์ให้ถูกต้อง")
    .min(5, "กรุณาระบุรหัสไปรษณีย์"),
  province: z.string().min(1, "กรุณาระบุจังหวัด"),
  district: z.string().min(1, "กรุณาระบุอำเภอ"),
  subdistrict: z.string().min(1, "กรุณาระบุตำบล"),
  cardName: z.string().min(1, { message: "กรุณาระบุชื่อผู้รับ" }),
  cardNumber: z
    .string()
    .min(1, { message: "กรุณาระบุหมายเลขบัตร" })
    .max(16, { message: "กรุณาระบุหมายเลขบัตร" }),
  expiry: z.string().min(1, { message: "กรุณาระบุวันหมดอายุ" }),
  cvv: z.string().min(1, { message: "กรุณาระบุ CVV" }),
});

// eslint-disable-next-line react/prop-types
export default function CheckOutForm({ items }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      address: "",
      postalCode: "",
      province: "",
      district: "",
      subdistrict: "",
      cardName: "",
      cardNumber: "",
      expiry: "",
      cvv: "",
    },
  });
  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.

    try {
      const res = await axios.post(`http://localhost:3001/api/orders/new`, {
        ...values,
        items,
        userId: user.id,
        shoppingCartId: user.shoppingCart.id,
      });

      if (res.status === 200) {
        console.log(res.data);

        queryClient.invalidateQueries({
          queryKey: ["shoppingCartItems"],
        });
        navigate("/order/" + res.data.id);
        // navigate("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <div className="grid grid-cols-3 gap-x-2">
        <h1 className="col-span-3">การชำระเงิน</h1>
        <label className="w-full col-span-2 form-control">
          <div className="label">
            <span className="label-text">ชื่อที่อยู่บนบัตร</span>
          </div>
          <input
            type="text"
            name="cardName"
            autoComplete="cardName"
            {...register("cardName")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.cardName && (
              <span className="text-red-600 label-text-alt">
                {errors.cardName.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">วันหมดอายุบัตร</span>
          </div>
          <input
            type="text"
            name="expiry"
            autoComplete="expiry"
            {...register("expiry")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.expiry && (
              <span className="text-red-600 label-text-alt">
                {errors.expiry.message}
              </span>
            )}
          </div>
        </label>
        <label className="w-full col-span-2 form-control">
          <div className="label">
            <span className="label-text">หมายเลขบัตร</span>
          </div>
          <input
            type="number"
            name="cardNumber"
            autoComplete="cardNumber"
            {...register("cardNumber")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.cardNumber && (
              <span className="text-red-600 label-text-alt">
                {errors.cardNumber.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">CVV</span>
          </div>
          <input
            type="number"
            name="cvv"
            autoComplete="cvv"
            {...register("cvv")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.cvv && (
              <span className="text-red-600 label-text-alt">
                {errors.cvv.message}
              </span>
            )}
          </div>
        </label>
      </div>
      <div className="divider"></div>
      <div className="grid grid-cols-3 gap-x-2">
        <h1 className="col-span-3">ป้อนชื่อและที่อยู่</h1>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">ชื่อ</span>
          </div>
          <input
            type="text"
            name="firstName"
            {...register("firstName")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.firstName && (
              <span className="text-red-600 label-text-alt">
                {errors.firstName.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">นามสกุล</span>
          </div>
          <input
            type="text"
            name="lastName"
            {...register("lastName")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.lastName && (
              <span className="text-red-600 label-text-alt">
                {errors.lastName.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full col-span-2 form-control">
          <div className="label">
            <span className="label-text">อีเมล</span>
          </div>
          <input
            type="text"
            name="email"
            {...register("email")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.email && (
              <span className="text-red-600 label-text-alt">
                {errors.email.message}
              </span>
            )}
          </div>
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">หมายเลขโทรศัพท์</span>
          </div>
          <input
            type="text"
            name="phoneNumber"
            {...register("phoneNumber")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.phoneNumber && (
              <span className="text-red-600 label-text-alt">
                {errors.phoneNumber.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full col-span-2 form-control">
          <div className="label">
            <span className="label-text">ที่อยู่ในการจัดส่ง</span>
          </div>
          <input
            type="text"
            name="address"
            {...register("address")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.address && (
              <span className="text-red-600 label-text-alt">
                {errors.address.message}
              </span>
            )}
          </div>
        </label>
        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">หมายเลขไปรษณีย์</span>
          </div>
          <input
            type="number"
            name="postalCode"
            {...register("postalCode")}
            className="w-full input input-bordered"
          />
          <div className="label">
            {errors.postalCode && (
              <span className="text-red-600 label-text-alt">
                {errors.postalCode.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">จังหวัด</span>
          </div>
          <select
            className="select select-bordered"
            name="province"
            {...register("province")}
          >
            <option disabled></option>
            {thaiProvince.map((province) => (
              <option key={province.id} value={province.id.toString()}>
                {province.name_th} - {province.name_en}
              </option>
            ))}
          </select>
          <div className="label">
            {errors.province && (
              <span className="text-red-600 label-text-alt">
                {errors.province.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">อำเภอ</span>
          </div>

          <select
            className="select select-bordered"
            name="district"
            {...register("district")}
          >
            <option disabled></option>
            {thaiDistrict
              .filter((district) => district.province_id == watch("province"))
              .map((district) => (
                <option key={district.id} value={district.id.toString()}>
                  {district.name_th} - {district.name_en}
                </option>
              ))}
          </select>
          <div className="label">
            {errors.district && (
              <span className="text-red-600 label-text-alt">
                {errors.district.message}
              </span>
            )}
          </div>
        </label>

        <label className="w-full form-control">
          <div className="label">
            <span className="label-text">ตำบล</span>
          </div>
          <select
            className="select select-bordered"
            name="subdistrict"
            {...register("subdistrict")}
          >
            <option disabled></option>
            {thaiSubdistrict
              .filter(
                (subdistrict) => subdistrict.amphure_id == watch("district")
              )
              .map((subdistrict) => (
                <option key={subdistrict.id} value={subdistrict.id.toString()}>
                  {subdistrict.name_th} - {subdistrict.name_en}
                </option>
              ))}
          </select>
          <div className="label">
            {errors.subdistrict && (
              <span className="text-red-600 label-text-alt">
                {errors.subdistrict.message}
              </span>
            )}
          </div>
        </label>
      </div>

      <div className="divider"></div>
      <div className="items-center justify-center col-span-2 gap-y-6">
        <button type="submit" className="w-full btn rounded-3xl btn-primary">
          ดำเนินการสั่งซื้อ
        </button>
      </div>
    </form>
  );
}
