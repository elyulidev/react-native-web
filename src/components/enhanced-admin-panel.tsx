import type React from "react";
import { useState, useMemo } from "react";
import {
	Users,
	BookOpen,
	FileText,
	ClipboardList,
	X,
	UserPlus,
	Plus,
	Edit,
} from "lucide-react";
import { QueryClientProvider } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Modal } from "./ui/modal";
import { Pagination } from "./ui/pagination";
//import { DataTable } from "./ui/data-table";
import {
	useUsers,
	useRoles,
	useCreateUser,
	useDeleteUser,
	useUpdateUserProfile,
	useUpdateUserRole,
} from "@/hooks/use-users";
import { queryClient } from "@/lib/react-query";
import type {
	//Course,
	Profile,
	//UserCourse,
	/* QuizAttempt,
	AssignmentSubmission, */
	UserEdited,
} from "@/types/database";
/* import {
	useCourses,
	useCreateCourse,
	useDeleteCourse,
	useUpdateCourse,
} from "@/hooks/use-courses"; */
/* import {
	useAssignUserToCourse,
	useCoursesForEnrollment,
	useProfiles,
	useRemoveUserFromCourse,
	useUserCourses,
} from "@/hooks/use-user-courses"; */
/* import {
	useDeleteQuizAttempt,
	useQuizAttempts,
} from "@/hooks/use-quiz-attempts";
import {
	useAssignmentSubmissions,
	useDeleteAssignmentSubmission,
} from "@/hooks/use-assignments"; */
import AdminAlertDialog from "./admin-alert-dialog";
import { useLanguage } from "@/hooks/use-language";
import { Spinner } from "./spinner";
import { toast } from "sonner";

type AdminTab =
	| "users"
	| "courses"
	| "user-courses"
	| "quizzes"
	| "assignments";

interface EnhancedAdminPanelProps {
	onClose: () => void;
}

export function EnhancedAdminPanel({ onClose }: EnhancedAdminPanelProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<EnhancedAdminPanelContent onClose={onClose} />
		</QueryClientProvider>
	);
}

function EnhancedAdminPanelContent({ onClose }: EnhancedAdminPanelProps) {
	const [activeTab, setActiveTab] = useState<AdminTab>("users");
	const { t } = useLanguage();

	return (
		<div className='flex flex-col h-screen bg-background text-foreground'>
			<header className='flex items-center justify-between p-6 border-b border-border bg-card sticky top-0 z-10'>
				<h1 className='text-2xl font-bold text-card-foreground'>
					{t("adminPanelTitle")}
				</h1>
				<Button variant='ghost' size='sm' onClick={onClose}>
					<X className='h-5 w-5' />
				</Button>
			</header>

			<div className='flex flex-1 overflow-hidden'>
				{/* Sidebar Navigation */}
				<nav className='w-64 bg-sidebar border-r border-sidebar-border p-4'>
					<div className='space-y-2'>
						<TabButton
							id='users'
							label='Users'
							icon={Users}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<TabButton
							id='courses'
							label='Courses'
							icon={BookOpen}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<TabButton
							id='user-courses'
							label='Enrollments'
							icon={UserPlus}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<TabButton
							id='quizzes'
							label='Quiz Attempts'
							icon={FileText}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
						<TabButton
							id='assignments'
							label='Assignments'
							icon={ClipboardList}
							activeTab={activeTab}
							setActiveTab={setActiveTab}
						/>
					</div>
				</nav>

				{/* Main Content */}
				<main className='flex-1 overflow-y-auto p-6'>
					<div className='max-w-7xl mx-auto'>
						{activeTab === "users" && <UsersPanel />}
						{/* {activeTab === "courses" && <CoursesPanel />} */}
						{/* {activeTab === "user-courses" && <UserCoursesPanel />} */}
						{/* {activeTab === "quizzes" && <QuizAttemptsPanel />} */}
						{/* {activeTab === "assignments" && <AssignmentsPanel />} */}
					</div>
				</main>
			</div>
		</div>
	);
}

interface TabButtonProps {
	id: AdminTab;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
	activeTab: AdminTab;
	setActiveTab: (tab: AdminTab) => void;
}

function TabButton({
	id,
	label,
	icon: Icon,
	activeTab,
	setActiveTab,
}: TabButtonProps) {
	const isActive = activeTab === id;
	return (
		<button
			onClick={() => setActiveTab(id)}
			className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
				isActive
					? "bg-sidebar-primary text-sidebar-primary-foreground"
					: "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
			}`}
		>
			<Icon className='h-4 w-4' />
			{label}
		</button>
	);
}

// Users Panel
function UsersPanel() {
	const [currentPage, setCurrentPage] = useState(1);
	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<UserEdited | null>(null);

	const {
		data: usersData,
		isLoading: usersLoading,
		error: usersError,
	} = useUsers(currentPage, 10);
	const { data: roles = [] } = useRoles();
	const createUserMutation = useCreateUser();
	const updateUserProfileMutation = useUpdateUserProfile();
	const updateUserRoleMutation = useUpdateUserRole();
	const deleteUserMutation = useDeleteUser();
	const { t } = useLanguage();

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		control,
		formState: { errors, isSubmitting, isValid },
	} = useForm({
		resolver: zodResolver(
			z
				.object({
					email: z.email(t("emailError")),
					role_id: z.string().min(1, t("roleError")),
					password: z.string().min(8, t("passwordError")),
					passwordConfirm: z.string().min(8, t("passwordMatchError")),
				})
				.refine((data) => data.password === data.passwordConfirm, {
					message: t("passwordMatchError"),
					path: ["passwordConfirm"],
				})
		),
		defaultValues: {
			email: "",
			role_id: "",
			password: "",
			passwordConfirm: "",
		},
		mode: "onChange",
	});

	if (usersError) toast.error(usersError.message);

	const totalPages = useMemo(() => usersData?.totalPages || 1, [usersData]);
	const totalItems = useMemo(() => usersData?.count || 0, [usersData]);

	const filteredUsers = useMemo(() => {
		if (!searchTerm) return usersData?.data || [];
		return (usersData?.data || [])?.filter((user: Profile) =>
			user.email?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, usersData]);

	const onSubmit = async (data: {
		email: string;
		role_id: string;
		password: string;
	}) => {
		if (editingUser) {
			const updates = {
				email: data.email,
				role_id: data.role_id,
				password: data.password,
			};
			await updateUserProfileMutation.mutateAsync({
				userId: editingUser.id,
				updates,
			});
		} else {
			const userData = {
				email: data.email,
				role_id: data.role_id,
				password: data.password,
			};
			await createUserMutation.mutateAsync(userData);
		}
		setIsModalOpen(false);
		setEditingUser(null);
		reset();
	};

	const handleEdit = (user: UserEdited) => {
		setEditingUser(user);
		setValue("email", user?.email || "");
		setValue("role_id", user.role_id || "");
		setValue("password", user.password || "");
		setIsModalOpen(true);
	};

	const handleDelete = async (user: UserEdited) => {
		await deleteUserMutation.mutateAsync(user?.id);
	};

	const handleRoleChange = async (userId: string, role_id: string) => {
		await updateUserRoleMutation.mutateAsync({ userId, role_id });
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingUser(null);
		reset({ email: "", role_id: "", password: "", passwordConfirm: "" });
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-3xl font-bold'>{t("adminUsers")}</h2>
				<Button
					onClick={() => {
						setEditingUser(null);
						reset();
						setIsModalOpen(true);
					}}
				>
					<Plus className='h-4 w-4 mr-2' />
					{t("adminCreateUser")}
				</Button>
			</div>

			<div className='flex items-center space-x-2'>
				<Input
					placeholder='Search users by email...'
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className='max-w-sm'
				/>
			</div>

			<div className='bg-card rounded-lg border border-border'>
				<div className='overflow-x-auto'>
					<table className='w-full'>
						<thead>
							<tr className='border-b border-border'>
								<th className='text-left p-4 font-medium'>Email</th>
								<th className='text-left p-4 font-medium'>
									{t("adminTableRole")}
								</th>
								<th className='text-left p-4 font-medium'>
									{t("adminTableDate")}
								</th>
								<th className='text-right p-4 font-medium'>
									{t("adminTableActions")}
								</th>
							</tr>
						</thead>
						<tbody>
							{usersLoading ? (
								<tr>
									<td
										colSpan={4}
										className='text-center p-8 text-muted-foreground'
									>
										<Spinner />
									</td>
								</tr>
							) : filteredUsers.length === 0 ? (
								<tr>
									<td
										colSpan={4}
										className='text-center p-8 text-muted-foreground'
									>
										{t("adminNoResults")}
									</td>
								</tr>
							) : (
								filteredUsers.map((user: Profile) => (
									<tr
										key={user.id}
										className='border-b border-border last:border-0 hover:bg-muted/50'
									>
										<td className='p-4'>
											<div className='font-medium'>{user.email}</div>
										</td>
										<td className='p-4'>
											<Select
												value={user.role_id || ""}
												onValueChange={(value) =>
													handleRoleChange(user.id, value)
												}
												disabled={updateUserProfileMutation.isPending}
											>
												<SelectTrigger className='w-32'>
													<SelectValue />
												</SelectTrigger>
												<SelectContent>
													{roles.map((role) => (
														<SelectItem key={role.id} value={role.id}>
															{role.name}
														</SelectItem>
													))}
												</SelectContent>
											</Select>
										</td>
										<td className='p-4'>
											<span className='text-muted-foreground'>
												{user.created_at
													? new Date(user.created_at).toLocaleDateString()
													: "N/A"}
											</span>
										</td>
										<td className='p-4'>
											<div className='flex items-center justify-end gap-2'>
												<Button
													variant='ghost'
													size='sm'
													onClick={() => handleEdit(user)}
												>
													<Edit className='h-4 w-4' />
												</Button>
												<AdminAlertDialog
													user={user}
													onContinue={() => handleDelete(user)}
												/>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>

				<div className='border-t border-border p-4'>
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						totalItems={totalItems}
						itemsPerPage={10}
						onPageChange={setCurrentPage}
					/>
				</div>
			</div>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={editingUser ? t("adminEditUser") : t("adminCreateUser")}
			>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div className='space-y-1'>
						<Label htmlFor='email'>{t("email")}</Label>
						<Input
							id='email'
							type='email'
							{...register("email")}
							placeholder={t("emailPlaceholder")}
							className={errors.email ? "border-red-500" : ""}
						/>

						{errors.email && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.email.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<Label htmlFor='password'>{t("password")}</Label>
						<Input
							id='password'
							type='password'
							{...register("password")}
							placeholder={t("passwordPlaceholder")}
							className={errors.password ? "border-red-500" : ""}
						/>
						{errors.password && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.password.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<Label htmlFor='passwordConfirm'>
							{t("passwordConfirmPlaceholder")}
						</Label>
						<Input
							id='passwordConfirm'
							type='password'
							{...register("passwordConfirm")}
							placeholder={t("passwordConfirmPlaceholder")}
							className={errors.passwordConfirm ? "border-red-500" : ""}
						/>
						{errors.passwordConfirm && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.passwordConfirm.message}
							</p>
						)}
					</div>

					<div className='space-y-1'>
						<Label htmlFor='role_id'>{t("role")}</Label>
						<Controller
							name='role_id'
							control={control}
							render={({ field: { value, onChange, ...field } }) => (
								<Select
									value={value}
									onValueChange={onChange}
									{...field}
									defaultValue={value}
								>
									<SelectTrigger
										className={errors.role_id ? "border-red-500" : ""}
									>
										<SelectValue placeholder={t("rolePlaceholder")} />
									</SelectTrigger>
									<SelectContent>
										{roles.map((role) => (
											<SelectItem key={role.id} value={role.id}>
												{role.name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>

						{errors.role_id && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.role_id.message}
							</p>
						)}
					</div>

					<div className='flex gap-2 justify-end'>
						<Button type='button' variant='outline' onClick={handleCloseModal}>
							Cancel
						</Button>
						<Button type='submit' disabled={isSubmitting || !isValid}>
							{editingUser ? t("adminEditUser") : t("adminCreateUser")}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}

// Courses Panel
/* function CoursesPanel() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	//const [searchTerm, setSearchTerm] = useState("");
	const [editingCourse, setEditingCourse] = useState<Course | null>(null);
	const { t } = useLanguage();

	const {
		data: courses,
		isLoading: courseLoading,
		error: coursesError,
	} = useCourses(1, 10);
	const {
		data: usersData,
		isLoading: usersLoading,
		error: usersError,
	} = useUsers(1, 10);
	const createCourseMutation = useCreateCourse();
	const updateCourseMutation = useUpdateCourse();
	const deleteCourseMutation = useDeleteCourse();

	const {
		register,
		handleSubmit,
		setValue,
		reset,
		control,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(
			z.object({
				name: z
					.string()
					.min(1, "El nombre del curso es requerido")
					.max(100, "El nombre del curso debe ser menor a 100 carácteres"),
				instructor_id: z.uuid({
					error: "El campo instructor_id debe tener formato uuid",
				}),
			})
		),
		defaultValues: {
			name: "",
			instructor_id: "",
		},
	});

	if (usersError) toast.error(usersError.message);
	if (coursesError) toast.error(coursesError.message);

	const totalPages = useMemo(() => courses?.totalPages || 1, [courses]);
	const totalItems = useMemo(() => courses?.count || 0, [courses]);

	const filteredCourses = useMemo(() => {
		if (!searchTerm) return courses?.data || [];
		return (courses?.data || [])?.filter((course: Course) =>
			course.name?.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [searchTerm, courses]);

	const onSubmit = async (data: { name: string; instructor_id: string }) => {
		if (editingCourse) {
			await updateCourseMutation.mutateAsync({
				courseId: editingCourse.id,
				courseData: data,
			});
		} else {
			await createCourseMutation.mutateAsync(data);
		}

		setIsModalOpen(false);
		setEditingCourse(null);
		reset();
	};

	const handleEdit = (course: Course) => {
		setEditingCourse(course);
		setValue("name", course.name);
		setValue("instructor_id", course.instructor_id);
		setIsModalOpen(true);
	};

	const handleDelete = async (course: Course) => {
		await deleteCourseMutation.mutateAsync(course.id);
	};

	const columns = [
		{
			key: "name",
			label: "Course Name",
			render: (course: Course) => (
				<div className='font-medium'>{course.name}</div>
			),
		},
		{
			key: "instructor_id",
			label: "Instructor",
			render: (user: Profile) => <div className='font-medium'>{user.id}</div>,
		},
		{
			key: "created_at",
			label: "Created",
			render: (course: Course) => (
				<span className='text-muted-foreground'>
					{course.created_at
						? new Date(course.created_at).toLocaleDateString()
						: "N/A"}
				</span>
			),
		},
	];

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setEditingCourse(null);
		reset({ name: "", instructor_id: "" });
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-3xl font-bold'>{t("adminCourses")}</h2>
			</div>

			<DataTable
				data={courses}
				columns={columns}
				searchKey='name'
				onAdd={() => {
					setEditingCourse(null);
					reset();
					setIsModalOpen(true);
				}}
				onEdit={handleEdit}
				onDelete={handleDelete}
				addLabel='Add Course'
				loading={
					courseLoading ||
					usersLoading ||
					updateCourseMutation.isPending ||
					isSubmitting
				}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title={editingCourse ? t("adminEditCourse") : t("adminCreateCourse")}
			>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div>
						<Label htmlFor='name'>{t("adminTableCourseName")}</Label>
						<Input
							id='name'
							{...register("name")}
							placeholder={t("inputCourseNamePlaceholder")}
							className={errors.name ? "border-red-500" : ""}
						/>
						{errors.name && (
							<p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>
						)}
					</div>
					<div>
						<Controller
							name='instructor_id'
							control={control}
							render={({ field: { value, onChange, ...field } }) => (
								<Select
									value={value}
									onValueChange={onChange}
									defaultValue={value}
									{...field}
								>
									<SelectTrigger
										className={errors.instructor_id ? "border-red-500" : ""}
									>
										<SelectValue placeholder={t("rolePlaceholder")} />
									</SelectTrigger>
									<SelectContent>
										{usersData?.data.map((role) => (
											<SelectItem key={role.id} value={role.id}>
												{role?.name || "N/A"}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							)}
						/>

						{errors.instructor_id && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.instructor_id.message}
							</p>
						)}
					</div>

					<div className='flex gap-2 justify-end'>
						<Button type='button' variant='outline' onClick={handleCloseModal}>
							Cancel
						</Button>
						<Button type='submit' disabled={isSubmitting}>
							{editingCourse ? "Update" : "Create"} Course
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
} */

// User Courses Panel
/* function UserCoursesPanel() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data: userCourses = [], isLoading: loading } = useUserCourses();
	const { data: profiles = [] } = useProfiles();
	const { data: courses = [] } = useCoursesForEnrollment();
	const assignUserMutation = useAssignUserToCourse();
	const removeUserMutation = useRemoveUserFromCourse();

	const {
		setValue,
		watch,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: zodResolver(
			z.object({
				userId: z.string().min(1, "Please select a user"),
				courseId: z.string().min(1, "Please select a course"),
			})
		),
		defaultValues: {
			userId: "",
			courseId: "",
		},
	});

	const onSubmit = async (data: { userId: string; courseId: string }) => {
		await assignUserMutation.mutateAsync({
			userId: data.userId,
			courseId: data.courseId,
		});

		setIsModalOpen(false);
		reset();
	};

	const handleDelete = async (enrollment: UserCourse) => {
		if (!confirm("Are you sure you want to remove this enrollment?")) return;
		await removeUserMutation.mutateAsync(enrollment.id);
	};

	const columns = [
		{
			key: "user",
			label: "User",
			render: (enrollment: UserCourse) => (
				<div className='font-medium'>{enrollment.profiles?.email}</div>
			),
		},
		{
			key: "course",
			label: "Course",
			render: (enrollment: UserCourse) => <div>{enrollment.courses?.name}</div>,
		},
		{
			key: "role",
			label: "Role",
			render: (enrollment: UserCourse) => (
				<span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary'>
					{enrollment.profiles?.roles?.name}
				</span>
			),
		},
		{
			key: "created_at",
			label: "Enrolled",
			render: (enrollment: UserCourse) => (
				<span className='text-muted-foreground'>
					{enrollment.created_at
						? new Date(enrollment.created_at).toLocaleDateString()
						: "N/A"}
				</span>
			),
		},
	];

	const handleCloseModal = () => {
		setIsModalOpen(false);
		reset();
	};

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-3xl font-bold'>Course Enrollments</h2>
			</div>

			<DataTable
				data={userCourses}
				columns={columns}
				onAdd={() => {
					reset();
					setIsModalOpen(true);
				}}
				onDelete={handleDelete}
				addLabel='Enroll User'
				loading={loading}
			/>

			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				title='Enroll User in Course'
			>
				<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
					<div>
						<Label htmlFor='userId'>Select User</Label>
						<Select
							value={watch("userId")}
							onValueChange={(value) => setValue("userId", value)}
						>
							<SelectTrigger className={errors.userId ? "border-red-500" : ""}>
								<SelectValue placeholder='Choose a user' />
							</SelectTrigger>
							<SelectContent>
								{profiles.map((profile) => (
									<SelectItem key={profile.id} value={profile.id}>
										{profile.email} ({profile.roles?.name})
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.userId && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.userId.message}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor='courseId'>Select Course</Label>
						<Select
							value={watch("courseId")}
							onValueChange={(value) => setValue("courseId", value)}
						>
							<SelectTrigger
								className={errors.courseId ? "border-red-500" : ""}
							>
								<SelectValue placeholder='Choose a course' />
							</SelectTrigger>
							<SelectContent>
								{courses.map((course) => (
									<SelectItem key={course.id} value={course.id}>
										{course.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
						{errors.courseId && (
							<p className='text-sm text-red-500 mt-1'>
								{errors.courseId.message}
							</p>
						)}
					</div>

					<div className='flex gap-2 justify-end'>
						<Button type='button' variant='outline' onClick={handleCloseModal}>
							Cancel
						</Button>
						<Button type='submit' disabled={isSubmitting}>
							Enroll User
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
} */

// Quiz Attempts Panel
/* function QuizAttemptsPanel() {
	const { data: attempts = [], isLoading: loading } = useQuizAttempts();
	const deleteAttemptMutation = useDeleteQuizAttempt();

	const handleDelete = async (attempt: QuizAttempt) => {
		if (!confirm("Are you sure you want to delete this quiz attempt?")) return;
		await deleteAttemptMutation.mutateAsync(attempt.id);
	};

	const columns = [
		{
			key: "user",
			label: "User",
			render: (attempt: QuizAttempt) => (
				<div className='font-medium'>{attempt.profiles?.email}</div>
			),
		},
		{
			key: "course",
			label: "Course",
			render: (attempt: QuizAttempt) => <div>{attempt.courses?.name}</div>,
		},
		{
			key: "quiz_id",
			label: "Quiz ID",
			render: (attempt: QuizAttempt) => (
				<div className='font-mono text-sm'>{attempt.quiz_id}</div>
			),
		},
		{
			key: "score",
			label: "Score",
			render: (attempt: QuizAttempt) => (
				<span
					className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
						attempt.score >= 70
							? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
							: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
					}`}
				>
					{attempt.score}%
				</span>
			),
		},
		{
			key: "created_at",
			label: "Date",
			render: (attempt: QuizAttempt) => (
				<span className='text-muted-foreground'>
					{attempt.created_at
						? new Date(attempt.created_at).toLocaleString()
						: "N/A"}
				</span>
			),
		},
	];

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-3xl font-bold'>Quiz Attempts</h2>
			</div>

			<DataTable
				data={attempts}
				columns={columns}
				onDelete={handleDelete}
				loading={loading}
			/>
		</div>
	);
} */

// Assignments Panel
/* function AssignmentsPanel() {
	const { data: submissions = [], isLoading: loading } =
		useAssignmentSubmissions();
	const deleteSubmissionMutation = useDeleteAssignmentSubmission();

	const handleDelete = async (submission: AssignmentSubmission) => {
		if (!confirm("Are you sure you want to delete this assignment submission?"))
			return;
		await deleteSubmissionMutation.mutateAsync(submission.id);
	};

	const columns = [
		{
			key: "user",
			label: "User",
			render: (submission: AssignmentSubmission) => (
				<div className='font-medium'>{submission.profiles?.email}</div>
			),
		},
		{
			key: "course",
			label: "Course",
			render: (submission: AssignmentSubmission) => (
				<div>{submission.courses?.name}</div>
			),
		},
		{
			key: "assignment_id",
			label: "Assignment ID",
			render: (submission: AssignmentSubmission) => (
				<div className='font-mono text-sm'>{submission.assignment_id}</div>
			),
		},
		{
			key: "content",
			label: "Content Preview",
			render: (submission: AssignmentSubmission) => (
				<div className='max-w-xs truncate text-muted-foreground'>
					{submission.content || "No content"}
				</div>
			),
		},
		{
			key: "created_at",
			label: "Submitted",
			render: (submission: AssignmentSubmission) => (
				<span className='text-muted-foreground'>
					{submission.created_at
						? new Date(submission.created_at).toLocaleString()
						: "N/A"}
				</span>
			),
		},
	];

	return (
		<div className='space-y-6'>
			<div className='flex items-center justify-between'>
				<h2 className='text-3xl font-bold'>Assignment Submissions</h2>
			</div>

			<DataTable
				data={submissions}
				columns={columns}
				onDelete={handleDelete}
				loading={loading}
			/>
		</div>
	);
} */
